# SIH Form Auto-Fill Script

A small browser-console JavaScript snippet that auto-fills the **Smart India Hackathon (SIH)** team-member registration form (Name, Email, Mobile, Gender, Category, PwD, Nationality, Stream, Academic Year).

Built for a **6-member B.Tech/BE team** but easily editable for any team.

---

## ✨ Features

- ✅ Fills all 6 rows of the SIH team form in one shot
- ✅ Handles SIH dropdown quirks: `UR` ↔ `Unreserved(UR)`, `B.Tech` ↔ `BE/B.Tech`, `3rd Year` ↔ `3`
- ✅ Fires React/Angular-compatible `input`, `change`, and `blur` events
- ✅ Console logs each row + summary
- ✅ **Does NOT auto-submit** — you review and click *Save as Draft* manually
- ✅ Zero dependencies, pure vanilla JS

---

## 📋 Prerequisites

1. A modern browser (Chrome / Edge / Firefox recommended)
2. The SIH registration form **open and visible**
3. Your team data (edit the `students` array — see below)

---

## 🚀 How to Use

### Step 1 — Open the SIH form
Log in to the SIH portal and navigate to the page that contains the **Team Member** table.

### Step 2 — Open DevTools Console
| OS      | Shortcut |
|---------|----------|
| Windows | `F12` or `Ctrl + Shift + I` → **Console** tab |
| macOS   | `Cmd + Option + I` → **Console** tab |

### Step 3 — Paste the script
1. Open `autofill.js`
2. Copy **everything**
3. Paste it into the **Console** and press **Enter**

You should see logs like:

```
✓ Row 1: Riya Soni | Female | OBC | 3rd Year
✓ Row 2: Rudra Pratap Singh | Male | UR | 4th Year
...
✓ SIH FORM FILLED — 6 / 6 students
⚠️  Form NOT submitted — review and submit manually.
```

### Step 4 — Review & Submit
Look over the filled table, correct anything, then click **Save as Draft**.

---

## 🛠️ Customizing for Your Team

Edit the `students` array at the top of `autofill.js`:

```javascript
const students = [
  {
    role: "Team Leader",
    name: "Riya Soni",
    gender: "Female",
    email: "riyasoni8193@gmail.com",
    mobile: "8193093110",
    stream: "B.Tech",      // or: BCA, MCA, BBA, MBA, B.Sc, M.Tech, PhD, Diploma, Medical, Others
    year: "3rd Year",      // or: 1st/2nd/4th/5th/6th Year
    category: "OBC",       // or: UR, SC, ST, EWS
    pwd: "NA",             // or: VI, LD, HI
    nationality: "Indian"
  },
  // … more members
];
```

Rules:
- The **first object** is treated as the **Team Leader**.
- Add or remove objects — the script fills rows in order until it runs out.
- Values are matched **case-insensitively** and with smart fallbacks.

---

## 🌐 Supported Field Values

| Field         | Accepted values |
|---------------|-----------------|
| `gender`      | `Male`, `Female`, `Other` |
| `category`    | `UR` / `Unreserved`, `OBC`, `SC`, `ST`, `EWS` |
| `pwd`         | `NA`, `VI`, `LD`, `HI` |
| `nationality` | `Indian`, or any country present in the dropdown |
| `stream`      | `Diploma`, `B.Sc`/`Bsc`, `BCA`, `MCA`, `BBA`, `MBA`, `B.Tech`/`BE`, `M.Tech`/`ME`, `PhD`, `Medical`, `Others` |
| `year`        | `1st Year` … `6th Year` (also accepts `1` … `6`) |

---

## ⚠️ Important Notes

- This script **only drafts/fills** the form. It **never clicks Submit**.
- SIH portals sometimes change class names or wrap inputs in React. This script uses `name` attributes (`student_name[]`, `student_email[]`, …) which have been stable. If a future update breaks it, update the selectors in the *Query DOM* section.
- If your browser blocks paste-in-console, type `allow pasting` first (Chrome/Edge) or use a userscript manager like Tampermonkey.
- Always **verify all data** before final submission — SIH rejects forms with mismatched details.

---

## 🐞 Troubleshooting

| Problem | Fix |
|--------|-----|
| `Row 1 not found` | Make sure you are on the exact page with the student table (not the "Nominate Team" tab). |
| `Option "..." not found` | Your dropdown has a value not in the list. Add a case in `setSelect()`. |
| Values appear but reset immediately | The page uses a custom React/Vue input. Report the framework in an issue. |
| Nothing happens | Check the Console for errors. Ensure the script is fully pasted (ends with `})();`). |

---

## 🧪 Tested On

- SIH 2024 / 2025 registration portal
- Google Chrome 120+, Microsoft Edge 120+, Firefox 121+

---

## 📄 License

MIT — see [LICENSE](LICENSE).

---

## 🤝 Contributing

PRs welcome. Open an issue first for major changes.

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-change`
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/my-change`
5. Open a Pull Request

---

## ⭐ Support

If this saved you 20 minutes of typing, give it a ⭐ on GitHub!
