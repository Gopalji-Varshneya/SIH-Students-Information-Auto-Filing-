(() => {
  "use strict";

  /* =========================================================
   * SIH Form Auto-Fill Script
   * Team: Riya Soni (Leader) + 5 Members
   * Stream: BE/B.Tech
   * Matches ACTUAL SIH dropdown text values.
   * ========================================================= */

  const students = [
    {
      role: "Team Leader",
      name: "Nmae1",
      gender: "Female",
      email: "email1@gmail.com",
      mobile: "9999999999",
      stream: "BE/B.Tech",       // exact text in dropdown
      year: "3rd Year",
      category: "OBC",
      pwd: "Not Applicable",
      nationality: "Indian"
    },
    {
      role: "Team Leader",
      name: "Nmae2",
      gender: "Female",
      email: "email2@gmail.com",
      mobile: "9999999999",
      stream: "BE/B.Tech",       // exact text in dropdown
      year: "3rd Year",
      category: "OBC",
      pwd: "Not Applicable",
      nationality: "Indian"
    },
    {
      role: "Team Leader",
      name: "Nmae3",
      gender: "Female",
      email: "email3@gmail.com",
      mobile: "9999999999",
      stream: "BE/B.Tech",       // exact text in dropdown
      year: "3rd Year",
      category: "OBC",
      pwd: "Not Applicable",
      nationality: "Indian"
    },
    {
      role: "Team Leader",
      name: "Nmae4",
      gender: "Female",
      email: "email4@gmail.com",
      mobile: "9999999999",
      stream: "BE/B.Tech",       // exact text in dropdown
      year: "3rd Year",
      category: "UR",
      pwd: "Not Applicable",
      nationality: "Indian"
    },
   {
      role: "Team Leader",
      name: "Nmae5",
      gender: "Male",
      email: "email5@gmail.com",
      mobile: "9999999999",
      stream: "BE/B.Tech",       // exact text in dropdown
      year: "3rd Year",
      category: "SC",
      pwd: "Not Applicable",
      nationality: "Indian"
    },
    {
      role: "Team Leader",
      name: "Nmae6",
      gender: "Female",
      email: "email6@gmail.com",
      mobile: "9999999999",
      stream: "BE/B.Tech",       // exact text in dropdown
      year: "3rd Year",
      category: "OBC",
      pwd: "Not Applicable",
      nationality: "Indian"
    }
  ];

  /* =========================================================
   * Helpers
   * ========================================================= */

  function setInput(el, value) {
    if (!el) return false;

    const setter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value"
    )?.set;

    if (setter) setter.call(el, String(value));
    else el.value = String(value);

    el.dispatchEvent(new Event("input",  { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    el.dispatchEvent(new Event("blur",   { bubbles: true }));

    return true;
  }

  /**
   * Match an <option> by (in order):
   *   1. exact value
   *   2. exact visible text
   *   3. normalized fuzzy match (strips spaces, dots, case)
   *   4. synonym expansion (UR <-> Unreserved, B.Tech <-> BE/B.Tech, etc.)
   */
  function setSelect(el, wanted) {
    if (!el) return false;

    const norm = s => String(s)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/\./g, "")
      .replace(/[()]/g, "");

    const target     = String(wanted).trim().toLowerCase();
    const targetNorm = norm(wanted);

    const opts = [...el.options];

    // 1. exact value
    let option = opts.find(o => o.value.trim().toLowerCase() === target);

    // 2. exact text
    if (!option) {
      option = opts.find(o => o.textContent.trim().toLowerCase() === target);
    }

    // 3. normalized value / text
    if (!option) {
      option = opts.find(o =>
        norm(o.value) === targetNorm || norm(o.textContent) === targetNorm
      );
    }

    // 4. synonym expansion
    if (!option) {
      const synonyms = {
        // Category
        "ur":         ["unreserved", "unreservedur", "ur", "general"],
        "unreserved": ["unreservedur", "ur", "general"],
        "obc":        ["obc"],
        "sc":         ["sc"],
        "st":         ["st"],
        "ews":        ["ews"],

        // Stream
        "btech":      ["bebtech", "btech", "be", "b.e"],
        "be":         ["bebtech", "btech"],
        "bebtech":    ["bebtech"],
        "bsc":        ["bsc"],
        "bca":        ["bca"],
        "mca":        ["mca"],
        "bba":        ["bba"],
        "mba":        ["mba"],
        "mtech":      ["memtech", "mtech"],
        "me":         ["memtech", "mtech"],
        "memtech":    ["memtech"],
        "phd":        ["phd"],
        "medical":    ["medicalpharma", "medical"],
        "medicalpharma": ["medicalpharma"],

        // PwD
        "na":         ["notapplicable", "na"],
        "notapplicable": ["notapplicable", "na"],
        "vi":         ["visuallyimpairedvi", "vi", "visuallyimpaired"],
        "visuallyimpaired": ["visuallyimpairedvi", "vi"],
        "ld":         ["locomotordisabilityld", "ld", "locomotordisability"],
        "locomotordisability": ["locomotordisabilityld", "ld"],
        "hi":         ["hearingimpairedhi", "hi", "hearingimpaired"],
        "hearingimpaired": ["hearingimpairedhi", "hi"],

        // Year
        "1styear":    ["1styear", "1"],
        "2ndyear":    ["2ndyear", "2"],
        "3rdyear":    ["3rdyear", "3"],
        "4thyear":    ["4thyear", "4"],
        "5thyear":    ["5thyear", "5"],
        "6thyear":    ["6thyear", "6"]
      };

      const keys = synonyms[targetNorm] || [];
      option = opts.find(o => {
        const v = norm(o.value);
        const t = norm(o.textContent);
        return keys.some(k => v === k || t === k || t.includes(k));
      });
    }

    if (!option) {
      console.warn(`[SIH Autofill] No matching option for "${wanted}" in`, el);
      return false;
    }

    el.value = option.value;
    el.dispatchEvent(new Event("input",  { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    el.dispatchEvent(new Event("blur",   { bubbles: true }));

    return true;
  }

  /* =========================================================
   * Query DOM (name-attribute based — most stable across SIH builds)
   * ========================================================= */

  const names         = document.querySelectorAll('input[name="student_name[]"]');
  const emails        = document.querySelectorAll('input[name="student_email[]"]');
  const mobiles       = document.querySelectorAll('input[name="student_mobile[]"]');
  const genders       = document.querySelectorAll('select[name="student_gender[]"]');
  const categories    = document.querySelectorAll('select[name="student_category[]"]');
  const pwds          = document.querySelectorAll('select[name="student_pwd[]"]');
  const nationalities = document.querySelectorAll('select[name="student_nationality[]"]');
  const streams       = document.querySelectorAll('select[name="student_stream[]"]');
  const years         = document.querySelectorAll('select[name="student_year[]"]');

  /* =========================================================
   * Fill rows
   * ========================================================= */

  let filled = 0;

  students.forEach((student, i) => {
    if (!names[i]) {
      console.warn(`[SIH Autofill] Row ${i + 1} not found — skipping ${student.name}`);
      return;
    }

    setInput(names[i],   student.name);
    setInput(emails[i],  student.email);
    setInput(mobiles[i], student.mobile);

    setSelect(genders[i],       student.gender);
    setSelect(categories[i],    student.category);
    setSelect(pwds[i],          student.pwd);
    setSelect(nationalities[i], student.nationality);
    setSelect(streams[i],       student.stream);
    setSelect(years[i],         student.year);

    filled++;
    console.log(
      `✓ Row ${i + 1}: ${student.name} | ${student.gender} | ${student.category} | ${student.year}`
    );
  });

  /* =========================================================
   * Summary
   * ========================================================= */

  console.log("=================================");
  console.log(`✓ SIH FORM FILLED — ${filled} / ${students.length} students`);
  console.log("✓ Stream        = BE/B.Tech");
  console.log("✓ Academic Year = 3rd / 4th Year");
  console.log("✓ PwD           = Not Applicable");
  console.log("✓ Nationality   = Indian");
  console.log("⚠️  NOT submitted — review before clicking Save as Draft.");
  console.log("=================================");

  alert(`SIH form filled: ${filled} of ${students.length} rows.\nPlease review before submitting.`);
})();
