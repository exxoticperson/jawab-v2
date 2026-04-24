# Skill Writer System

This is the minimum viable operating system for the new `Skill-Writer` role.

## Purpose

The Skill-Writer sits before execution when the task is specialized, repeated, or quality-sensitive.

It does two things:

1. improves the incoming task brief so execution starts cleaner
2. decides whether an existing reusable skill should be used, adapted, or a new one should be created

## What Counts As A Skill

A task becomes a skill when:

- the workflow repeats
- output quality matters
- the same mistakes or drift keep showing up
- a reusable checklist or routing layer would save time

A task does **not** become a skill when:

- it is one-off
- it is too generic
- the value is only in a single answer, not a repeatable process

## Routing Rules

### Reuse Existing Skill

Reuse when the task is a strong match for an existing skill.

### Adapt Existing Skill

Adapt when the task is adjacent and only needs a tighter version of something that already exists.

### Create New Skill

Create only when:

- the workflow has repeated more than once
- the quality bar matters
- no current skill covers it well

## File Layout

- `04_System_and_Skills/SKILL_INDEX.md`
  - registry of active project-specific skills
- `04_System_and_Skills/SKILL_INTAKE_TEMPLATE.md`
  - template for creating a new skill
- `04_System_and_Skills/*.md`
  - one file per project-local skill
- `04_System_and_Skills/EXTERNAL_SKILL_INTAKE.md`
  - filter for external repos, Antigravity materials, and future skill packs

## This Week's First Skills

1. `source_of_truth_guard`
2. `execution_verification`
3. `lead_pain_proofing`
4. `outreach_personalization`
5. `gulf_dialect_copy`
6. `clinic_economic_audit`
7. `demo_critique`
8. `offer_packaging`

## Operating Loop

For any new specialized task:

1. rewrite the task into a sharp brief
2. check the skill index
3. decide: reuse, adapt, or create
4. route execution through the matched skill
5. record what improved and what still drifted

## External Skill Rule

When the user sends a repo, plugin, or skill pack:

1. mine for patterns, not installation
2. compare against `EXTERNAL_SKILL_INTAKE.md`
3. import only the smallest local skill or reference that changes execution
4. keep current Jawab strategy untouched unless `Jawab-OS` explicitly changes it

## Output Contract

Every Skill-Writer pass should produce:

- `task brief`
- `matched skill`
- `reason`
- `new skill needed?`
- `next execution route`

## Anti-Bloat Rules

- do not create a new skill just because a task sounds fancy
- do not create multiple overlapping skills for the same job
- do not treat chat memory as the skill system
- keep skills short, practical, and execution-facing
