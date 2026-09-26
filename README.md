# SIH Team Form Autofill — AI-Assisted JavaScript Automation

During my work as an **SIH Coordinator**, I faced a simple but repetitive challenge: entering student details again and again for multiple teams.

I created a small **JavaScript-based automation approach** and used **AI-assisted development** to make the process easier.

The workflow is simple:

**Excel / Google Sheets → AI → JavaScript → Browser Console → Form Autofill**

This project is intended as a practical example of how AI-assisted development and lightweight browser automation can solve repetitive administrative tasks.

---

## ✨ Features

* Fills multiple student rows in one operation
* Supports text inputs and dropdown fields
* Case-insensitive dropdown matching
* Supports common dropdown variations such as `UR` / `Unreserved(UR)` when available
* Fires `input` and `change` events
* Shows completion information in the browser Console
* **Does not automatically submit the form**
* Zero external dependencies
* Pure vanilla JavaScript
* Student data can be prepared easily using Excel / Google Sheets + AI

---

## 🔄 Workflow

```text
Excel / Google Sheets
        ↓
       AI
        ↓
JavaScript Student Array
        ↓
Browser DevTools Console
        ↓
SIH Form Autofill
        ↓
Manual Verification
        ↓
Save / Submit
```

---

## 📋 How It Works

### 1. Prepare Student Data

Prepare your team information in Excel or Google Sheets.

Example:

| Name           | Gender | Email                                         | Mobile     | Stream | Year     | Category |
| -------------- | ------ | --------------------------------------------- | ---------- | ------ | -------- | -------- |
| Demo Student 1 | Male   | [demo1@example.com](mailto:demo1@example.com) | 9000000001 | BCA    | 3rd Year | UR       |
| Demo Student 2 | Female | [demo2@example.com](mailto:demo2@example.com) | 9000000002 | BCA    | 3rd Year | SC       |
| Demo Student 3 | Male   | [demo3@example.com](mailto:demo3@example.com) | 9000000003 | BCA    | 3rd Year | OBC      |

> Use dummy data while testing. Replace it with actual student data only when you are ready to fill the real form.

---

## 🤖 2. Use AI to Generate the Student Array

Copy your Excel / Google Sheets data and ask ChatGPT, Claude, Gemini, or another AI coding assistant:

> **Prompt**
>
> "Convert this table of student data into the `students` JavaScript array format used by this SIH autofill script.
>
> Keep the column order exactly as:
>
> `Name, Gender, Email, Mobile, Stream, Year, Category`
>
> Give me the complete JavaScript inside a single IIFE.
>
> Do not submit the form."

AI can then convert your table into:

```javascript
const students = [
  ["Demo Student 1","Male","demo1@example.com","9000000001","BCA","3rd Year","UR"],
  ["Demo Student 2","Female","demo2@example.com","9000000002","BCA","3rd Year","SC"],
  ["Demo Student 3","Male","demo3@example.com","9000000003","BCA","3rd Year","OBC"]
];
```

---

## 💻 3. JavaScript Autofill Script

The following is a minimal example using dummy data:

```javascript
(() => {
  const students = [
    ["Demo Student 1","Male","demo1@example.com","9000000001","BCA","3rd Year","UR"],
    ["Demo Student 2","Female","demo2@example.com","9000000002","BCA","3rd Year","SC"],
    ["Demo Student 3","Male","demo3@example.com","9000000003","BCA","3rd Year","OBC"]
  ];

  const $ = s => document.querySelectorAll(s);

  const fields = [
    $('input[name="student_name[]"]'),
    $('input[name="student_email[]"]'),
    $('input[name="student_mobile[]"]'),
    $('select[name="student_gender[]"]'),
    $('select[name="student_stream[]"]'),
    $('select[name="student_year[]"]'),
    $('select[name="student_category[]"]')
  ];

  const set = (el, value) => {
    if (!el) return;

    if (el.tagName === "SELECT") {
      const option = [...el.options].find(o =>
        o.value.trim().toLowerCase() === value.toLowerCase() ||
        o.text.trim().toLowerCase() === value.toLowerCase()
      );

      if (option) el.value = option.value;
    } else {
      el.value = value;
    }

    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };

  students.forEach((student, i) =>
    fields.forEach((field, j) => set(field[i], student[j]))
  );

  console.log(`✓ ${students.length} students filled. Verify before submitting.`);
})();
```

---

## 🚀 4. How to Execute

### Step 1 — Open the SIH Form

Open the relevant SIH registration page and navigate to the page containing the student/team-member fields.

### Step 2 — Open Developer Tools

**Windows:**

```text
F12
```

or

```text
Ctrl + Shift + I
```

Then select the **Console** tab.

**macOS:**

```text
Cmd + Option + I
```

### Step 3 — Paste the Script

Copy the complete JavaScript code and paste it into the Console.

Press **Enter**.

### Step 4 — Verify

The script should populate the available student rows.

You should see a message similar to:

```text
✓ 3 students filled. Verify before submitting.
```

### Step 5 — Review Manually

Carefully check:

* Name
* Gender
* Email
* Mobile
* Stream
* Academic Year
* Category

Then use the portal's normal **Save / Save as Draft / Submit** workflow.

> ⚠️ The script does **not** automatically submit the form.

---

## 🛠️ Customizing the Data

You normally only need to modify the `students` array:

```javascript
const students = [
  ["Name","Gender","Email","Mobile","Stream","Year","Category"],
  ["Name","Gender","Email","Mobile","Stream","Year","Category"]
];
```

### Example

```javascript
const students = [
  ["Rahul Kumar","Male","rahul@example.com","9876543210","BCA","3rd Year","UR"],
  ["Priya Sharma","Female","priya@example.com","9876543211","BCA","3rd Year","SC"]
];
```

The order must remain:

```text
Name
Gender
Email
Mobile
Stream
Year
Category
```

---

## 📌 Important: Form Field Names

The script relies on the form's HTML `name` attributes:

```text
student_name[]
student_email[]
student_mobile[]
student_gender[]
student_stream[]
student_year[]
student_category[]
```

If the portal changes these field names, the script may need to be updated.

---

## 🐞 Troubleshooting

### Nothing happens

Check that:

* The correct SIH form page is open.
* The student fields are visible.
* The complete script was pasted.
* The browser Console shows no JavaScript errors.

### A row is not filled

The number of student records should not exceed the number of available form rows.

### Dropdown does not select

Check the exact option displayed by the form.

For example, the portal might use:

```text
Unreserved(UR)
```

instead of:

```text
UR
```

In that case, use the exact displayed value or extend the matching logic.

### Values appear and then disappear

The portal may use a framework or custom form component that requires additional event handling. Inspect the form's HTML and adjust the script accordingly.

---

## 🔐 Privacy & Data Protection

This project is intended for administrative automation.

Student information such as:

* Name
* Email
* Mobile number
* Category
* Academic information

may constitute personal information.

**Do not paste real student information into an AI service unless doing so is permitted by your institution's policies and applicable data-protection requirements.**

For public demonstrations and GitHub examples, always use **dummy data**.

---

## ⚠️ Disclaimer

This is an **independent automation utility** created for educational and administrative purposes.

It is **not an official SIH tool** and is not affiliated with or endorsed by Smart India Hackathon.

Portal structures, field names, dropdown values, and workflows may change. The script may therefore require modification when used with a different portal version or form.

Always verify the populated information manually before saving or submitting.

---

## 💡 Why This Approach?

Many administrative tasks are repetitive rather than technically complex.

Instead of manually entering the same information into every row, a small automation script can handle repetitive data entry while the coordinator remains responsible for:

1. Preparing the correct data
2. Reviewing the populated fields
3. Correcting errors
4. Completing the final submission

This is a simple example of applying **AI-assisted development + JavaScript automation** to a real-world coordination problem.

---

## 📚 Technologies

* JavaScript
* Browser DOM
* HTML Forms
* Chrome / Edge / Firefox DevTools
* Excel / Google Sheets
* AI-assisted development

---

## 🤝 Contributing

Suggestions and improvements are welcome.

If you find a portal-specific issue or have a useful improvement, feel free to open an issue or submit a pull request.

---

## 📄 License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to use, copy, modify, merge, publish, distribute, and sublicense the software, subject to the conditions of the MIT License.

---

## 🏷️ Tags

`#AIAssistedDevelopment` `#JavaScript` `#Automation` `#SmartIndiaHackathon` `#SIH2026` `#ProblemSolving` `#EducationTechnology` `#Faculty`
