# 🚀 **Bell & Barks: Quick Recovery Guide**

## **Emergency Recovery Procedures**

### **🆘 Quick Recovery Commands**

#### **Option 1: Rollback to Last Stable Version**
```bash
# Check available versions
git tag -l

# Rollback to specific version
git checkout tags/v1.0.0-frontend-complete
git checkout -b emergency-recovery
npm install
npm run dev
```

#### **Option 2: Reset to Specific Commit**
```bash
# View recent commits
git log --oneline -10

# Hard reset to specific commit
git reset --hard [commit-hash]
npm install
npm run dev
```

#### **Option 3: Download Release Backup**
```bash
# Download from GitHub releases
wget https://github.com/[org]/bell-and-barks/releases/download/v1.0.0/backup.tar.gz

# Extract and restore
tar -xzf backup.tar.gz
npm install
npm run dev
```

### **🔧 Recovery Scenarios**

#### **Scenario 1: Broken Development Environment**
```bash
# Clean install
rm -rf node_modules package-lock.json
git checkout HEAD -- package.json
npm install
npm run dev
```

#### **Scenario 2: Corrupted Files**
```bash
# Restore specific files
git checkout HEAD -- [file-name]

# Restore entire directory
git checkout HEAD -- src/
```

#### **Scenario 3: Lost Work (Uncommitted Changes)**
```bash
# Check if stash exists
git stash list

# Recover from stash
git stash pop

# Check reflog for lost commits
git reflog
git checkout [reflog-hash]
```

### **📋 Recovery Checklist**

- [ ] Backup current broken state (just in case)
- [ ] Identify last known working state
- [ ] Choose recovery method
- [ ] Execute recovery commands
- [ ] Verify application functionality
- [ ] Test critical features
- [ ] Document what went wrong

### **🔍 Health Check Commands**

```bash
# Verify environment
npm run build
npm run test
npm run lint

# Check application
npm run dev
# Visit http://localhost:5175
# Test navigation and key features
```

### **📞 Emergency Contacts**

- **Technical Issues**: Create GitHub issue
- **Critical Bugs**: Emergency branch + hotfix
- **Data Loss**: Check GitHub releases and artifacts

---

**Always commit working states before major changes!** 🛡️
