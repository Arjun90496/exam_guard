#!/bin/bash
# Auto-commit strategy for ExamShieldAI
git add .
git commit -m "Automated build/sync: $(date +'%Y-%m-%d %H:%M:%S')"
# git push origin main
echo "Changes committed successfully."
