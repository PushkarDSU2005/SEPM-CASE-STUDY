# Student Task Management System — Requirements Analysis

The tables distinguish **confirmed information** from items that are **inferred, proposed for confirmation, or not specified**. Project context is drawn from [PROJECT_DETAILS.md](</c:/Users/Pushkar/OneDrive/Documents/SEPM_AI_Agile_Case_Study/PROJECT_DETAILS.md>).

## 1. Functional Requirements

| ID | Requirement | Status / Notes |
|---|---|---|
| FR-01 | The system shall allow students to register. | Confirmed by the request. Registration fields and validation rules are not specified. |
| FR-02 | The system shall allow students to log in. | Confirmed by the request. Authentication method and failure handling are not specified. |
| FR-03 | The system shall allow students to create academic tasks. | Confirmed by the request. Required task fields are not specified. |
| FR-04 | The system shall allow students to edit academic tasks. | Confirmed by the request. Editable fields and edit restrictions are not specified. |
| FR-05 | The system shall allow students to delete academic tasks. | Confirmed by the request. Deletion behavior, including whether confirmation or recovery is needed, is not specified. |
| FR-06 | The system shall allow students to set task deadlines. | Confirmed by the request. Deadline format, time zone, and whether deadlines can be changed are not specified. |
| FR-07 | The system shall allow students to set a task’s status to Pending, In Progress, or Completed. | Confirmed by the request. Allowed status transitions and any initial default status are not specified. |
| FR-08 | The system shall allow students to view upcoming tasks. | Confirmed by the request. The definition of “upcoming” and the presentation or ordering of results are not specified. |
| FR-09 | The system shall allow students to view overdue tasks. | Confirmed by the request. The rule for determining overdue tasks, including how completed tasks are treated, is not specified. |

## 2. Non-Functional Requirements

No measurable non-functional requirements were provided. The following quality attributes need clarification; they are **not established requirements**.

| Quality attribute | Status | Information needed |
|---|---|---|
| Security and privacy | Not specified | Authentication protections, data access rules, and privacy expectations. |
| Performance | Not specified | Response-time or load targets. |
| Availability and reliability | Not specified | Availability targets, backup, and recovery expectations. |
| Usability and accessibility | Not specified | Usability goals, accessibility standard, and supported devices or browsers. |
| Compatibility | Partially informed | The project context lists HTML, CSS, and JavaScript, but supported platforms and browsers are not specified. |
| Maintainability | Not specified | Coding, documentation, and maintenance expectations. |

## 3. Stakeholders

| Stakeholder | Basis | Interest / involvement |
|---|---|---|
| Students | Confirmed as system users in the request. | Register, log in, manage academic tasks, and view upcoming and overdue tasks. |
| Project developer / team | Project details state a team size of one. | Develop and test the system; apply the stated Agile Scrum methodology. |
| Instructor, evaluator, or academic supervisor | Likely in a university case-study context, but not named in the project details. | May review project deliverables or outcomes; confirm whether this stakeholder applies and what authority they have. |

## 4. Project Constraints

| Constraint | Basis / status |
|---|---|
| The project is a Student Task Management System. | Confirmed by the request and project details. |
| The documented technology stack is HTML, CSS, JavaScript, Git, and GitHub. | Confirmed in [PROJECT_DETAILS.md](</c:/Users/Pushkar/OneDrive/Documents/SEPM_AI_Agile_Case_Study/PROJECT_DETAILS.md>). |
| The documented development methodology is Agile Scrum. | Confirmed in [PROJECT_DETAILS.md](</c:/Users/Pushkar/OneDrive/Documents/SEPM_AI_Agile_Case_Study/PROJECT_DETAILS.md>). |
| The documented team size is one. | Confirmed in [PROJECT_DETAILS.md](</c:/Users/Pushkar/OneDrive/Documents/SEPM_AI_Agile_Case_Study/PROJECT_DETAILS.md>). |
| Functional, negative, and automated testing are listed as testing approaches. | Confirmed in [PROJECT_DETAILS.md](</c:/Users/Pushkar/OneDrive/Documents/SEPM_AI_Agile_Case_Study/PROJECT_DETAILS.md>). |
| Budget, schedule, deployment environment, hosting, and regulatory constraints. | Not specified; confirm before treating any as project constraints. |

## 5. Assumptions

No assumptions are confirmed by the supplied information. These are **candidate assumptions for validation**, not requirements or established facts.

| Candidate assumption | Why it needs confirmation |
|---|---|
| Each student manages their own tasks. | The request identifies students as users but does not state whether tasks are private, shared, or otherwise visible. |
| A task has a deadline that can be used to determine whether it is upcoming or overdue. | Deadlines and those task views are requested, but the exact classification rules are not defined. |
| Students can access the system using a browser. | The documented stack is web-oriented, but deployment and supported access methods are not stated. |

## 6. Possible Risks

| Risk | Potential impact | Notes / possible response |
|---|---|---|
| Ambiguous task fields and deadline rules | Inconsistent implementation and testing. | Confirm required task data, deadline format and time zone, and upcoming/overdue definitions. |
| Authentication details are undefined | Registration and login may not meet user or project expectations. | Clarify credential, account lifecycle, and error-handling expectations. |
| Status and deletion behavior are undefined | User-visible behavior may be inconsistent or lead to unintended data loss. | Agree on valid status transitions, initial status, and deletion behavior. |
| Non-functional expectations are absent | The delivered system may not meet expectations for security, usability, accessibility, or performance. | Define applicable quality attributes and measurable acceptance criteria. |
| Single-person team capacity | Delivery, testing, and review activities may compete for limited time. | Confirm timeline and prioritize scope; no schedule was provided. |
| AI-generated artifacts may contain errors or unsupported assumptions | Defects or incorrect requirements may carry into implementation and tests. | The project details identify this as a project concern; apply human review and testing as planned. |
