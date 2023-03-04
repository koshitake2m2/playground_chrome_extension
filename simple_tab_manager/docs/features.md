# Features

## usecase
- on installed this extension
  - open option page and pin it
    - create untitled workspace
- create untitled workspace
  - set id
  - set `Untitled at 1970/01/01 00:00:00` to name
  - save untitled workspace
  - set untitled workspace id to opened workspace id
- save workspaceA
- on updated tabs
  - if increased (not pinned)tabs.size from (not pinned)tabs.size == 0 then
    - create untitled workspace
  - save workspaceA
- close workspaceA
  - save workspaceA
  - open option page and pin it if not
  - remove all workspaceA's tabs
    - exclude pinned tabs
  - set undefined to opened workspace id
- open workspaceA
  - set opened workspace id
  - oepn workspaceA's tabs
- change workspaceA to workspaceB
  - close workspaceA
  - set workspaceB id to opened workspace id
  - open workspaceB
- on launched chrome and open last tabs
  - get opened workspace id
    - if undefined then
      - then,
        - if (not pinned)tabs.size > 0
          - then, create untitled workspace
      - else, follow below
  - open workspaceA

## usecase by state
- on launch chrome app
  - no tabs(chrome's start up page)
  - only this extension page
  - pre tabs without workspace(not set opened workspace id)
  - pre tabs with workspace

