#!/usr/bin/env python3
"""GitHub Projects のデータを取得して README のステータスセクションを更新する"""

import json
import subprocess
import sys

QUERY = """
{
  user(login: "Rikuto-des") {
    projectV2(number: 3) {
      items(first: 100) {
        nodes {
          status: fieldValueByName(name: "Status") {
            ... on ProjectV2ItemFieldSingleSelectValue {
              name
            }
          }
          points: fieldValueByName(name: "Story Points") {
            ... on ProjectV2ItemFieldNumberValue {
              number
            }
          }
          content {
            ... on Issue {
              title
              state
            }
          }
        }
      }
    }
  }
}
"""

STATUS_ORDER = ["IceBox", "PreIPM", "IPM", "CurrentBackLog", "Done"]
STATUS_EMOJI = {
    "IceBox": "🧊",
    "PreIPM": "📋",
    "IPM": "🤝",
    "CurrentBackLog": "🚀",
    "Done": "✅",
}


def fetch_project_data():
    result = subprocess.run(
        ["gh", "api", "graphql", "-f", f"query={QUERY}"],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"Error: {result.stderr}", file=sys.stderr)
        sys.exit(1)
    return json.loads(result.stdout)


def build_stats(data):
    items = data["data"]["user"]["projectV2"]["items"]["nodes"]

    stats = {s: {"count": 0, "points": 0} for s in STATUS_ORDER}
    total_points = 0
    total_count = 0

    for item in items:
        status = item.get("status", {})
        status_name = status.get("name") if status else None
        points_data = item.get("points", {})
        points = int(points_data.get("number", 0)) if points_data else 0

        if status_name in stats:
            stats[status_name]["count"] += 1
            stats[status_name]["points"] += points
        total_points += points
        total_count += 1

    return stats, total_count, total_points


def generate_section(stats, total_count, total_points):
    done = stats["Done"]
    progress = (done["count"] / total_count * 100) if total_count > 0 else 0

    lines = []
    lines.append("<!-- stats-start -->")
    lines.append("## 📊 プロジェクト状況")
    lines.append("")

    # Progress bar
    filled = int(progress / 5)
    bar = "█" * filled + "░" * (20 - filled)
    lines.append(f"**進捗**: `{bar}` {progress:.0f}% ({done['count']}/{total_count} stories)")
    lines.append("")
    lines.append(f"**合計ポイント**: {total_points} pts")
    lines.append("")

    # Status table
    lines.append("| ステータス | ストーリー数 | ポイント |")
    lines.append("|---|---|---|")
    for s in STATUS_ORDER:
        emoji = STATUS_EMOJI[s]
        c = stats[s]["count"]
        p = stats[s]["points"]
        lines.append(f"| {emoji} {s} | {c} | {p} pts |")

    lines.append("")
    lines.append("*自動更新 by GitHub Actions*")
    lines.append("<!-- stats-end -->")
    return "\n".join(lines)


def update_readme(section):
    with open("README.md", "r") as f:
        content = f.read()

    start = "<!-- stats-start -->"
    end = "<!-- stats-end -->"

    if start in content and end in content:
        before = content[:content.index(start)]
        after = content[content.index(end) + len(end):]
        content = before + section + after
    else:
        content = content.rstrip() + "\n\n" + section + "\n"

    with open("README.md", "w") as f:
        f.write(content)


def main():
    data = fetch_project_data()
    stats, total_count, total_points = build_stats(data)
    section = generate_section(stats, total_count, total_points)
    update_readme(section)
    print(f"README updated: {total_count} stories, {total_points} pts")


if __name__ == "__main__":
    main()
