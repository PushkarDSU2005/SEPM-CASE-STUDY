# Agile Product Backlog – Student Task Management System

## 1. Product Vision

To develop a simple and user-friendly Student Task Management System that helps university students organize academic tasks, manage deadlines, track progress and identify upcoming and overdue assignments.

## 2. Agile Methodology

The project follows Agile Scrum.

The Product Backlog contains prioritized features that will be developed and tested in small increments called Sprints.

## 3. Product Backlog and User Stories

| ID | User Story | Requirement | Priority |
|---|---|---|---|
| US-01 | As a student, I want to register so that I can create an account. | FR-01 | Must Have |
| US-02 | As a student, I want to log in so that I can access my tasks. | FR-02 | Must Have |
| US-03 | As a student, I want to create academic tasks so that I can organize my assignments. | FR-03 | Must Have |
| US-04 | As a student, I want to edit academic tasks so that I can update task information. | FR-04 | Must Have |
| US-05 | As a student, I want to delete academic tasks so that I can remove unnecessary tasks. | FR-05 | Must Have |
| US-06 | As a student, I want to set deadlines so that I can manage my submission dates. | FR-06 | Must Have |
| US-07 | As a student, I want to update task status so that I can track my progress. | FR-07 | Must Have |
| US-08 | As a student, I want to view upcoming tasks so that I can prepare for future deadlines. | FR-08 | Must Have |
| US-09 | As a student, I want to view overdue tasks so that I can identify unfinished tasks past their deadlines. | FR-09 | Must Have |

## 4. Acceptance Criteria

### US-01: Student Registration
- The student can enter the required registration information.
- The system validates the required fields.
- The system provides feedback when registration is successful or invalid.

### US-02: Student Login
- A registered student can enter login credentials.
- Valid credentials allow access.
- Invalid credentials display an error message.

### US-03: Create Tasks
- The student can create a new academic task.
- A task must have a title.
- The task can include a description, deadline and status.

### US-04: Edit Tasks
- The student can select an existing task.
- The student can update its information.
- Updated information is displayed.

### US-05: Delete Tasks
- The student can delete an existing task.
- The deleted task no longer appears in the task list.

### US-06: Set Deadlines
- The student can assign a deadline to a task.
- The selected deadline is displayed with the task.
- The deadline is used to classify upcoming and overdue tasks.

### US-07: Update Task Status
- The student can select Pending, In Progress or Completed.
- The selected status is saved and displayed.

### US-08: Upcoming Tasks
- The system displays tasks with future deadlines that are not completed.
- The student can identify their upcoming academic work.

### US-09: Overdue Tasks
- The system displays tasks whose deadlines have passed and whose status is not Completed.
- Completed tasks are excluded from the overdue list.

## 5. Prioritization Technique – MoSCoW

MoSCoW is an Agile prioritization technique.

| Priority | Meaning |
|---|---|
| Must Have | Essential features required for the application. |
| Should Have | Important features that can be developed after essential features. |
| Could Have | Optional improvements if time permits. |
| Won't Have | Features excluded from the current project scope. |

### Applied Priorities

- Must Have: Registration, login, task creation, editing, deletion, deadlines, status management, upcoming and overdue task views.
- Should Have: Improved validation and user feedback.
- Could Have: Search, filtering and sorting.
- Won't Have: Payment gateway, mobile application and real university integration.

## 6. Sprint Planning

The project is divided into two development Sprints for this academic case study.

### Sprint 1 – Core Task Management

**Goal:** Develop the basic task management functionality.

Planned backlog items:
- US-01: Student registration
- US-02: Student login
- US-03: Create academic tasks
- US-04: Edit academic tasks
- US-05: Delete academic tasks
- US-06: Set deadlines

Expected deliverable:
A working application with registration/login demonstration and basic task management.

### Sprint 2 – Task Tracking and Quality

**Goal:** Complete task tracking and improve application quality.

Planned backlog items:
- US-07: Update task status
- US-08: View upcoming tasks
- US-09: View overdue tasks
- Functional testing
- Negative testing
- Bug fixing and improvements

Expected deliverable:
A working Student Task Management System with task tracking and tested functionality.

## 7. Scrum Roles and Responsibilities

The project is completed individually. Scrum responsibilities are simulated for this academic case study.

| Scrum Role | Responsibility |
|---|---|
| Product Owner | Defines product vision and prioritizes the backlog. |
| Scrum Master | Plans Scrum activities and monitors the development process. |
| Developer | Implements the application and manages the source code. |

The same student performs these responsibilities in the individual project.

## 8. Agile Review Mechanisms

The following review activities will be used:

- Sprint Planning: Select backlog items for each Sprint.
- Sprint Review: Demonstrate completed features.
- Sprint Retrospective: Identify problems and improvements.
- Backlog Refinement: Review and update requirements and priorities.
- Testing: Verify completed features against acceptance criteria.

## 9. Conclusion

The Product Backlog converts the validated requirements into manageable Agile user stories. MoSCoW prioritization helps identify essential features, while Sprint planning organizes development into smaller and achievable increments.