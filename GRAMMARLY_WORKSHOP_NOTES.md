---
theme: default
background: <IMAGE> # alt=technology
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Awesome Claude
  
  claude> let's vibe-code presentation about vibe-coding best practices
drawings:
  persist: false
transition: slide-left
title: Sending Good Vibes Only
mdc: true
---

# Awesome Claude

claude> let's vibe-code presentation about vibe-coding best practices

*Yarik Yermilov*

<IMAGE> # alt=Good vibes animation


<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: center
class: text-left
---

# not a joke!

```
╭────────────────────────────────────────────────────────╮
│ ✻ Welcome to Claude Code!                              │
│                                                        │
│   /help for help, /status for your current setup       │
│                                                        │
│   cwd: /Users/yarikyermilov/repos/awesome-claude-code  │
╰────────────────────────────────────────────────────────╯

 Tips for getting started:

 1. Run /init to create a CLAUDE.md file with instructions for Claude
 2. Use Claude to help with file analysis, editing, bash commands and git
 3. Be as specific as you would with another engineer for the best results
 4. ✔ Run /terminal-setup to set up terminal integration

 ※ Tip: Use /memory to view and manage Claude memory
```

<div class="bg-gray-800 text-green-400 p-2 rounded font-mono">
> <span class="text-yellow-300 font-bold">This is empty repo for now. Please create a stub of Slidev presentation here.</span>
</div>

```
⏺ I'll create a stub Slidev presentation in this repository.

⏺ Update Todos
  ⎿ ☐ Create package.json with Slidev dependencies
     ☐ Create slides.md with basic presentation structure
     ☐ Add basic Slidev configuration
```

---

# how to start?

<div class="text-center">

[go/awesome-claude-setup](LINK/awesome-claude-code/getting-started/account-setup/)

</div>

open any repository and:

```bash
claude
```

the first time you'll be asked to authenticate through console.anthropic.com - make sure you are in the Grammarly organization:

<IMAGE> # alt=Claude Code authentication screen showing Grammarly organization selection

---
layout: center
class: text-left
---

# let's try something

```
╭───────────────────────────────────────────────────────╮
│ ✻ Welcome to Claude Code!                             │
│                                                       │
│   /help for help, /status for your current setup      │
│                                                       │
│   cwd: /Users/yarikyermilov/repos/hackermango-badges  │
╰───────────────────────────────────────────────────────╯

> please fix the following exception

  java.lang.NullPointerException: Cannot invoke "java.util.List.get(int)" 
  
  because the return value of "dev.ai4j.openai4j.image.GenerateImagesResponse.data()" is null

      at dev.langchain4j.model.openai.OpenAiImageModel.generate(OpenAiImageModel.java:119)
      at grammarly.hackermango.badges.app.jobs.CalculateNewBadgesJob.generateBadgeImage(CalculateNewBadgesJob.java:265)
      at grammarly.hackermango.badges.app.jobs.CalculateNewBadgesJob.calculateNewBadges(CalculateNewBadgesJob.java:194)
      at grammarly.hackermango.badges.app.jobs.CalculateNewBadgesJob.calculateNewBadges(CalculateNewBadgesJob.java:97)
      at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:103)
      at java.base/java.lang.reflect.Method.invoke(Method.java:580)
      at org.springframework.scheduling.support.ScheduledMethodRunnable.runInternal(ScheduledMethodRunnable.java:130)
      at org.springframework.scheduling.support.ScheduledMethodRunnable.lambda$run$2(ScheduledMethodRunnable.java:124)
```

---
layout: center
class: text-left
---

# result of something

```
⏺ I'll help you fix this NullPointerException. Let me first examine the code to understand the issue.

⏺ Read(app/src/main/java/grammarly/hackermango/badges/app/jobs/CalculateNewBadgesJob.java)
  ⎿  Read 289 lines (ctrl+r to expand)

⏺ I can see the issue. The NullPointerException occurs at line 265 where imageModel.generate(imagePrompt) is called, 
and the response's data() method returns null. This suggests the image generation API call failed but didn't throw an exception.
  Let me add a null check to handle this gracefully:

⏺ Update(app/src/main/java/grammarly/hackermango/badges/app/jobs/CalculateNewBadgesJob.java)
╭──────────────────────────────────────────────────╮
│ Edit file                                        │
│ ╭──────────────────────────────────────────────╮ │
│ │ CalculateNewBadgesJob.java                   │ │
│ │                                              │ │
│ │ 265  Response<Image> imageResponse = ...     │ │
│ │ 266                                          │ │
│ │ 267+ if (imageResponse == null ||            │ │
│ │ 268+     imageResponse.content() == null) {  │ │
│ │ 269+   LOG.error("Image generation failed"); │ │
│ │ 270+   return;                               │ │
│ │ 271+ }                                       │ │
│ ╰──────────────────────────────────────────────╯ │
│ Do you want to make this edit?                   │
│ ❯ 1. Yes
```

---
layout: center
class: text-left
---

# let's try more

<IMAGE> # alt=Let's try more

well, it won't work ¯\\\_(ツ)_/¯

---

# FIRST MOST IMPORTANT SLIDE: why?

<div class="text-2xl">

- treat Claude Code as a very talented junior engineer hired in your team

- it is (always) their first day and you are their mentor

- they have no industry experience

- terminal interface is your chat application

- you can give them your tasks but need to help with context and reviews

- what you would write to human?

<IMAGE> # alt=Let's try more

</div>

---

<div class="grid grid-cols-2 gap-8 items-center">
<div class="text-xl">

<div class="flex flex-col gap-4 mt-4">
<IMAGE> # alt=Cursor IDE code completion in action
<IMAGE> # alt=Claude Code terminal interface and IDE integration
</div>
</div>
<div class="text-xl">

in contrast, Cursor started from the opposite direction as a super-powerful code completion IDE

but eventually they are moving to the same target with their chat sidebar and cli agents, but with some differences:

- model selection is bigger (OpenAI's GPTs and o-s, Google's Gemini-s)
- much more eager to action (you better stop me before it's too late!)

ultimately, that's a matter of personal taste, and a lot of today's presentation is useful for Cursor fans as well

</div>
</div>

---

<div class="text-2xl">

If you still prefer to do development in IDEs like our ancestors did around 3 months ago (terminal is a new IDE!), Claude Code provides you:

</div>

- **[VSCode-based extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)** for VSCode and forks like Cursor, Windsurf, and others
- **[Plugin for JetBrains IDEs](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-)** - IntelliJ, PyCharm, Rider, Android Studio, WebStorm, PhpStorm, GoLand, and others

<div class="relative flex justify-center items-center mt-4" style="height: 300px;">
  <IMAGE> # alt=Claude Code IDE integration
  <IMAGE> # alt=Claude Desktop
  <IMAGE> # alt=IDE plugins
</div>

---

# Claude models and costs

- Claude Code switches between small (Haiku) and large model (Sonnet by default), depending on task
- You can manually switch Sonnet to Opus (their largest model) to enhance performance for the most complex tasks - in this case - use `/model` command for that
- **Please remember that Opus currently costs 5x more compared to Sonnet**
- Anthropic started to add some additional flavours to `/model` recently - "Opus for planning" and "Sonnet with 1M tokens"
- model selection logic is quite tricky - it appears to be a global switch for all current and subsequent sessions
- Don't worry much about it for now, just keep monitoring what model is selected for you right now using status line:

<IMAGE> # alt=Claude Code status line showing current model selection

---

# How to set up status line like that?

- install [Awesome Claude Code](LINK/awesome-claude-code/getting-started/awesome-claude-tool/) - library of Claude Code recipes and best practices:

```bash
curl -fsSL LINK/awesome-claude-code/scripts/install.sh | bash
```

- Run the following command from terminal (LINK/awesome-claude-code/best-practices/pages/status-line-setup/):

```bash
recipe run setup-statusline
```

- No step 3!

---

# how to be Awesome with Claude?

- pay attention to tips from the status line:

<IMAGE> # alt=Status line showing helpful tips and notifications

---

# how to be Awesome with Claude?

- explore this presentation LINK/awesome-claude-code/presentation/

<IMAGE> # alt=Awesome Claude Code presentation website

---

# how to be Awesome with Claude?

- explore #claude-code Slack channel

<IMAGE> # alt=#claude-code Slack channel screenshot

---

# how to be Awesome with Claude?

- explore LINK/awesome-claude-code for hints like:

<IMAGE> # alt=Awesome Claude Code documentation portal homepage

---

# how to be Awesome with Claude?

- enable presets 

```
$ preset enable quickstart # useful for everyone
$ preset enable gitlab # if you use gitlab
$ preset enable github # if you use github
```

---

# how to be Awesome with Claude?

- explore interactive UI:

<LOOM>

---

# Lesson 1: CLAUDE.md

- CLAUDE.md is the same for Claude Code as README.md is for human developers
- Claude will re-read it every time it is doing something in the repository
- it is auto-generated via the /init command
- you can edit it manually to fix incorrect inferred facts
- if you see that Claude is making some systematic mistakes - just tell Claude **"instead do X and remember this information in CLAUDE.md"**
- check-in CLAUDE.md to git to share best practices
- you can put CLAUDE.md in any subdirectory to create localized shared instructions inside monorepos
- create **CLAUDE.local.md** and add it to .gitignore for your personal repository- and subdirectory-level tweaks
- create **~/.claude/CLAUDE.md** with your personal instructions that will be applied for all sessions

<IMAGE> # alt=CLAUDE.md example

---

# Lesson 2: MCP

- MCP (Model Context Protocol) is an emerging standard to integrate LLM apps with tools
- a tool is a way to allow LLM apps to perform actions in addition to just generating text
- think about it as provisioning access to developer tools for your intern
- sometimes Claude Code tries to use MCP tool by itself, but it is always better to hint `use GitLab MCP server to ...`
- explore recommended MCP servers here: LINK/awesome-claude-code/best-practices/collections/mcp-servers/
- CLI is almost always better than MCP: github, gitlab 
- honestly, there are no MCP servers right now that I can absolutely recommend (honorable mentions: time, sourcegraph, sumologic, workflow)

---

# Lesson 3: Allowlist safe (read-only) tools to speed-up feedback loops

- Claude Code always asks you to confirm before doing something
- there is no harm if you add read-only actions to allow list so they are performed automatically
- you will save yourself a lot of clicking Yes

<div class="grid grid-cols-2 gap-8 items-start">
<div>
<IMAGE> # alt=Claude Code tool allowlist configuration screen
</div>
<div>
<IMAGE> # alt=Example of allowlisted tools in action
</div>
</div>

---

# Lesson 4: Understand before making changes

- for very simple and straightforward tasks, you can just describe them in the prompt - this works well for tasks which you would give someone on their first day to onboard (fix exception, update dependency)
- a useful technique for non-trivial tasks is to split one prompt into two:

**INSTEAD**
```
> Please don't send code review nomination to the person if it is out of office today
```

**DO**
```
> /learn-code the logic to decide if nomination should be sent works
...
> Please change it to not send code review nomination to the person if it is out of office today
```

**HOW (awesome is that?)** (LINK/awesome-claude-code/best-practices/pages/learn-code-command/)

```bash
recipe run create-learn-code-command
```

---

# Lesson 5: TDD

- TDD works very well

**INSTEAD**
```
> please fix model taxonomy parsing for new GPT-4.1 model
```

**DO**
```
> please add test for GPT-4.1 model taxonomy parsing
...
> please update the logic for new test to pass
```

---

# Lesson 6: Follow the leader

- try to provide a reference for every change

```
> do X like it is done in AnotherClass
```

```
> do X similarly to how it is done in another/repo
```

```
> do X and follow the coding preferences from the already existing code.
```

---

# Lesson 7: Move across conversations

<div class="grid grid-cols-2 gap-8 items-start mt-4">
<div>

- hit ESC twice to go back to any point in time to try a different prompt
- this only changes your chat state; changes made by Claude Code are not reverted

<IMAGE> # alt=Claude Code conversation history navigation interface

</div>
<div>

- If your Claude Code session halted unexpectedly, simply run `claude --continue`
- Run `claude --resume` to browse the list of the latest sessions in the current directory

<IMAGE> # alt=Claude Code session resume interface showing recent sessions

</div>
</div>

---

# Lesson 8: Save the game often

- when you are using multi-stage prompts, it is easy to derail and mess everything up - use git commit to "save" the good state

```
> /commit-and-push
```

**HOW (awesome is that?)** (LINK/awesome-claude-code/best-practices/pages/commit-and-push-command/)

```bash
recipe run create-commit-and-push-command
```

---

# Lesson 9: Not only smart code complete

- in general, Claude Code could replicate full end-to-end flow of terminal obsessed developer that doesn't use IDE
- you can run prompts like "please set up development environment", especially good when there is documentation on how to do it :)
- also Claude Code is very good at `please run script and explain/summarize results to me`
- you can generate and run non-trivial shell commands or even scripts, for example:

```
> login to AWS, read service API token from Secrets Manager, test API call locally via curl and use response as an example to generate Response class
```

<IMAGE> # alt=Claude Code executing complex AWS CLI commands with JSON parsing

---

# Lesson 10: GitLab and GitHub

- you can use Claude Code to open merge/pull requests:

```
> /update-merge-request
> /update-pull-request
```

**HOW (awesome is that?)** (LINK/awesome-claude-code/best-practices/pages/update-merge-request-command/)

```bash
recipe run create-update-merge-request-command
```

- you can use Claude Code to fix failed CI jobs:

```
> /fix-ci-pipeline
```

**HOW (awesome is that?)** (LINK/awesome-claude-code/best-practices/pages/fix-ci-pipeline-command/)

```bash
recipe run fix-ci-pipeline-command
```

---

# Lesson 11: Context and compact

- In terms of quality, your most important currency is context and context size
- The context is not only your current prompt, but also the whole conversation you had with Claude Code during the current session
- **Be concise**: put as much relevant information into the conversation as possible (it will improve quality), but don't put more information just in case (it will degrade quality)
- **Auto-compact**: once the context window is full, Claude Code will automatically compact it to free some space. After auto-compact is performed, the quality is likely to degrade noticeably
- **New tasks**: if you switch to a new task in the same session, run `/clear` command, or restart Claude
- **Large tasks**: break them into smaller ones, dump a step-by-step plan into a markdown file inside the repository, and run `/clear` between subtasks
- **Manual compact**: once you see that auto-compact is approaching (warning in the bottom right corner), run `/compact <instructions on the most important information to preserve>`

<IMAGE> # alt=Context management warning and compacting interface

---

# Lesson 12: Context cleanup

- Use built-in `/context` Slash command to understand better what's in your context window

<IMAGE> # alt=Context command showing current session details

- Use `awesome-claude analyze-context-usage` to clean your context from unhelpful MCP servers: LINK/awesome-claude-code/best-practices/pages/analyze-context-usage/

---

# Lesson 13: ULTRATHINK

- if Claude Code doesn't seem intelligent enough to do your task, try to add thinking modifiers to your request:
- "_think_ how to do X" < "do X, _think hard_" < "do X, but before _think harder_" < "_ultrathink_ to do X"
- this is not a joke or an easter egg (https://www.anthropic.com/engineering/claude-code-best-practices):

<IMAGE> # alt=Official Anthropic documentation about thinking modifiers

- also be careful not to use it without need ("I _think_ you should ...")

---

# Lesson 14: Let me Google that

<div class="grid grid-cols-2 gap-8 items-start">
<div>

- you can drop URLs with blogs or links to GitHub snippets into prompts and Claude Code will use them to understand the task better
- you can ask Claude to literally run a web search for some topic to learn about something
- for more complex topics, discuss them with ChatGPT/Claude Desktop/Gemini or run Deep Research in ChatGPT/Perplexity, generate a summary in .md format and drop it into a file in the repository, then you will be able to reference it in your prompts

</div>
<div>

<LOOM>

</div>
</div>

---

# Lesson 15: Leave the notes

- if you spend a lot of time implementing some task step by step, ask Claude Code to generate an md-file that will summarize what you've done together
- you can reference this file later when you will fix the bugs or make improvements
- if you have done something repeatable (please create a new feature module), ask Claude Code to generate HOW_TO_DO_X.md file and link it from CLAUDE.md
- for large tasks, start literally with writing a design document and plan in an .md file:

```
> Here is the task: ... Let's create a design document on how we will implement it.
```

- iterate on the design document and plan until you are satisfied with it, then implement step by step:

```
> We are working on the task X and there is a design document explaining our approach. 
> Let's proceed with the next step.
```

- you can implement some of the subtasks yourself, commit the changes, and run the following prompt:

```
> We are working on the task X and there is a design document explaining our approach. 
> I've implemented the next subtask, you can check my changes in the last commit.
```

---

# SECOND MOST IMPORTANT SLIDE: Putting it all together

1. `/learn-code CODE AREA YOU PLAN TO MODIFY`
2. Give references to blogs, GitHub public repos, Deep Research materials about your task
3. Ask questions, provide guidance until you sure that Claude Code undestands well
4. `Please document your understanding of the area to md file in docs/specs/ directory`
5. Explain the task in small chunked subtasks
6. `Please document your understanding of the task to md file in docs/plans/ directory`
7. Review every subtask result, if all good - run `/commit-and-push`
8. After the task is done - run `/update-merge-request`
9. Finalize with `/fix-ci-pipeline`
10. `Please update corresponding documents in docs/specs and docs/plans directory`
11. BONUS: `Please submit this merge request for review using hackermango mcp`

---

# Bonus: Visuals

- you can take screenshots and upload them to Claude Code as local files or just drag-n-drop screenshots to terminal

<div class="grid grid-cols-2 gap-4 mt-4">
  <IMAGE> # alt=Drag and drop screenshot upload to Claude Code terminal
  <IMAGE> # alt=Claude Code analyzing uploaded screenshot content
</div>

---

# LAST MOST IMPORTANT SLIDE: Improvise

- remember that you are talking through terminal to a very talented junior engineer on their first day
- explore LINK/awesome-claude-code and join **#claude-code**
- use Claude Code to increase your throughput (amount of work you can do), not latency (speed or quality of work), **assign background tasks to it**
- learn online, try things - it is fun
- if you have success with Claude Code - share it in **#claude-code** or write me a DM to discuss how to propogate your learnings
- if you struggle with Claude Code - write me a DM and I will set some time to help you
