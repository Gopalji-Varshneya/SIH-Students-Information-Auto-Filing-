## 🌐 Supported Field Values (exact SIH dropdown text)

| Field         | Accepted values (exact text in SIH) |
|---------------|-------------------------------------|
| `gender`      | `Male`, `Female`, `Other` |
| `category`    | `Unreserved(UR)`, `OBC`, `SC`, `ST`, `EWS` |
| `pwd`         | `Not Applicable`, `Visually Impaired(VI)`, `Locomotor Disability(LD)`, `Hearing Impaired(HI)` |
| `nationality` | `Indian`, or any country present in the dropdown |
| `stream`      | `Diploma`, `B.SC`, `BCA`, `MCA`, `BBA`, `MBA`, `BE/B.Tech`, `ME/M.Tech`, `Ph.D`, `Medical/Pharma`, `Others` |
| `year`        | `1st Year`, `2nd Year`, `3rd Year`, `4th Year`, `5th Year`, `6th Year` |

> **Shorthand also works.** Thanks to the synonym matcher, you can write `UR`, `B.Tech`, `NA`, `BTech`, `b.tech`, etc. — the script will still select the correct option.
