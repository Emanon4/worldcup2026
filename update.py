#!/usr/bin/env python3
"""
2026世界杯赛果自动更新脚本
- 抓取最新赛果
- 更新 data.json
- 自动 push 到 GitHub
"""
import json, re, subprocess, sys, os
from datetime import datetime, timezone, timedelta

BJT = timezone(timedelta(hours=8))
DATA_PATH = os.path.join(os.path.dirname(__file__), "data.json")
REPO_DIR = os.path.dirname(__file__)

def run(cmd, **kw):
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=REPO_DIR, **kw)
    return r.stdout.strip(), r.returncode

def load_data():
    with open(DATA_PATH, "r") as f:
        return json.load(f)

def save_data(data):
    with open(DATA_PATH, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def fetch_results():
    """Fetch latest match results from web_search via a simple approach"""
    try:
        # Use curl to hit a public API
        import urllib.request
        # Try worldcuplocaltime.com for results
        url = "https://worldcuplocaltime.com/fifa-world-cup-2026-results/"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=15)
        html = resp.read().decode("utf-8", errors="replace")
        
        # Parse results - look for score patterns
        results = {}
        # Pattern: Mexico 2 - 0 South Africa, etc.
        # This is a simple heuristic parser; the cron agent can do better
        score_pattern = r'(?:Mexico|South Africa|South Korea|Korea Republic|Czechia|Czech|Canada|Bosnia|USA|United States|Paraguay|Qatar|Switzerland|Brazil|Morocco|Haiti|Scotland|Australia|Turkey|Germany|Curaçao|Netherlands|Japan|Ivory Coast|Ecuador|Tunisia|Sweden|Spain|Cape Verde|Belgium|Egypt|Saudi Arabia|Uruguay|Iran|New Zealand|France|Senegal|Iraq|Norway|Argentina|Algeria|Austria|Jordan|Portugal|DR Congo|England|Croatia|Ghana|Panama|Colombia|Uzbekistan)\s+(\d+)\s*[-–]\s*(\d+)\s+(?:Mexico|South Africa|South Korea|Korea Republic|Czechia|Czech|Canada|Bosnia|USA|United States|Paraguay|Qatar|Switzerland|Brazil|Morocco|Haiti|Scotland|Australia|Turkey|Germany|Curaçao|Netherlands|Japan|Ivory Coast|Ecuador|Tunisia|Sweden|Spain|Cape Verde|Belgium|Egypt|Saudi Arabia|Uruguay|Iran|New Zealand|France|Senegal|Iraq|Norway|Argentina|Algeria|Austria|Jordan|Portugal|DR Congo|England|Croatia|Ghana|Panama|Colombia|Uzbekistan)'
        
        return results
    except Exception as e:
        print(f"Fetch error: {e}", file=sys.stderr)
        return {}

def git_push():
    """Push updated data.json to GitHub"""
    run("git add data.json")
    out, rc = run("git diff --cached --quiet")
    if rc != 0:  # changes exist
        now = datetime.now(BJT).strftime("%Y-%m-%d %H:%M BJT")
        run(f'git commit -m "🔄 更新赛果 {now}"')
        out, rc = run("git push origin main")
        if rc == 0:
            print(f"✅ Pushed updates at {now}")
        else:
            print(f"❌ Push failed: {out}")
    else:
        print("ℹ️ No changes to push")

def main():
    data = load_data()
    # Update timestamp
    data["lastUpdated"] = datetime.now(BJT).isoformat()
    
    # Fetch latest results (placeholder - the cron agent will do the real work)
    # results = fetch_results()
    # TODO: merge results into data["matches"]
    
    save_data(data)
    git_push()

if __name__ == "__main__":
    main()
