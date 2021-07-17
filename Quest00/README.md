# Quest 00. 형상관리 시스템

## Introduction
* git은 2021년 현재 개발 생태계에서 가장 각광받고 있는 버전 관리 시스템입니다. 이번 퀘스트를 통해 git의 기초적인 사용법을 알아볼 예정입니다.

## Topics
* git
  * `git clone`, `git add`, `git commit`, `git push`, `git pull`, `git branch`, `git stash` 명령
  * `.git` 폴더
* GitHub

## Resources
* [Resources to learn Git](https://try.github.io)
* [Learn Git Branching](https://learngitbranching.js.org/?locale=ko)
* [Inside Git: .Git directory](https://githowto.com/git_internals_git_directory)

## Checklist
### 형상관리 시스템은 왜 나오게 되었을까요?

과거와 달리 현재의 소프트웨어 코드 및 리소스는 훨씬 거대, 복잡해졌고 쉽게 변경됩니다. 형상 관리 시스템(VCS 혹은 SCM)은 프로젝트 리소스의 변경사항을 체계적으로 관리하는 기법이자 시스템입니다. 체계적인 형상관리가 이루어지지 않는다면 실수를 쉽게 되돌릴 수 없거나 히스토리를 추적하기 힘듭니다. 또한 다른 작업자가 어떤 작업을 했는지 알기 쉽지 않습니다.
또한, 단순히 코드의 버전을 관리하는것 뿐만 아니라 변경점이 다양한 환경과의 integrations을 위한 트리거가 되어 빠르고 지속가능한 개발이 가능하게 합니다.

### git은 어떤 형상관리 시스템이고 어떤 특징을 가지고 있을까요? 분산형 형상관리 시스템이란 무엇일까요?
[VCS 스냅샷 vs 델타](./vcs.md)
git은 스냅샷이 기본인 분산형 형상 관리 시스템(DVCS)입니다.
초기 VCS는 아주 간단한 데이터베이스를 사용하여 로컬에서 파일들의 변경 정보를 관리하였습니다. 그러나 다른 개발자들과 함께 작업해야 하는 경우가 많아졌고 이를 해결하기 위해 **중앙 집중식 버전 관리 시스템(CVCS)**이 개발 되었습니다. 중앙 서버에서 변경점들을 관리하다보니 서버가 다운되면 다른사람과 협업을 할 수 없거나 중앙 서버에 문제가 생기면 히스토리를 잃거나 복구하기 힘든 문제가 발생 하였고 현재는 CVCS보다 많은 장점을 가지고 있는 분산형 버전 관리 시스템(DVCS)을 많이 사용합니다.
분산형 버전 관리 시스템은 로컬 저장소가 독립적으로 완전한 데이터를 갖고 있습니다. 따라서 원격 저장소가 없이 로컬 저장소 만으로 버전 관리가 가능합니다. 마치 스포츠 경기가 시즌이 끝났을때 단순히 시즌 결과만 전달 받는것이 아니라 각 경기들의 순서와 결과들 까지도 함께 전달 받는것 처럼 단순히 마지막 스냅샷을 체크아웃 하는게 아니라 저장소의 히스토리도 전부 복제합니다. (그래서 명령어도 clone으로 정한것 같습니다)

#### git은 어떻게 개발되게 되었을까요? git이 분산형 시스템을 채택한 이유는 무엇일까요?
git은 Bitkeeper 라는 DVCS를 사용하여 리눅스 커널 소스를 관리하던 중 이용 약관 위반으로 더이상 Bitkeeper를 사용할 수 없게되어 리누즈 토발즈가 개발하게 되었습니다.
git이 분산형 시스템을 채택한 이유는 분산형 시스템이 갖는 장점들 때문이라고 생각합니다. CVCS와 다르게 DVCS로 (모든) 히스토리를 포함한 저장소를 로컬에서 관리하게 되면 대부분의 명령들은 로컬에서 실행할수있게 됩니다. 다른 저장소(remote)와는 저장소를 비교하고 동기화 하는 등의 작업만 하게 됩니다. 따라서 remote와 네트워킹이 불가능한 환경에서도 작업이 가능하고 병렬로도 작업이 가능합니다. 또한 중앙 저장소가 날라가버려도 쉽게 복구 할 수 있습니다.

### git과 GitHub은 어떻게 다를까요?
git은 VCS(Version Control System)중 하나 이고, DVCS의 특징을 갖고 있기 때문에 나의 저장소와 다른 저장소를 비교하며 맞춰나가는 동작이 필요하고 github은 중앙 저장소를 호스팅 해주는 서비스입니다. 또한 단순히 중앙 원격 저장소의 역할뿐 아니라 저장소에 관한 다양한 기능들을 제공합니다.

### git의 clone/add/commit/push/pull/branch/stash 명령은 무엇이며 어떨 때 이용하나요? 그리고 어떻게 사용하나요?
- [clone](https://git-scm.com/docs/git-clone)
  - 새로운 디렉토리로 repo를 복사합니다.
  - `git clone <url>`
- [add](https://git-scm.com/docs/git-add)
  - 파일을 스테이징 영역에 올리고 추적합니다. 
  - `git add <pathspec>`
- [commit](https://git-scm.com/docs/git-commit)
  - 스테이징 영역의 데이터를 기반으로 스냅샷을 생성합니다. (parent는 HEAD가 됩니다)
  - `git commit [options]`
    
- [push](https://git-scm.com/docs/git-push)
  - 원격 저장소의 참조를 업데이트 합니다.
  - `git push <remote name> <branch>`
    - `-f | --force`: 강제 푸시
    - `--all`: 모든 브랜치 푸시
    - `--tags`: 모든 tag refs 푸시
    - `--delete`: remote 브랜치 삭제
    - `-u`: 업스트림 트래킹 연결을 셋팅합니다.
- [pull](https://git-scm.com/docs/git-pull)
  - 원격 저장소의 커밋들을 로컬 저장소로 가져오고(fetch) 자동으로 병합합니다(merge)
  - `git pull [<options>] [<repository> [<refspec>...]]`
- [branch](https://git-scm.com/docs/git-branch)
  - 브랜치 리스트, 브랜치 생성, 삭제 등 브랜치와 관련된 동작을 합니다.
  - `git branch`: 브랜치 리스트 출력
  - `git branch -a`: remote 브랜치를 포함한 모든 브랜치 리스트 출력
  - `git branch <branch>`: <branch> 이름으로 새로운 브랜치 생성
  - `git branch -d <branch>`: 브랜치 삭제
  - `git branch -m <branch>`: 현재 브렌치 이름 변경
  
  
- [stash](https://git-scm.com/docs/git-stash)
  - 트래킹 되고 있으면서 수정된 파일과 스테이징 영역에 있는 파일들을 임시로 보관 합니다.
  - 아직 끝내지 않은 수정사항을 스택에 잠시 저장했다가 나중에 다시 적용할 수 있습니다(브랜치가 달라져도).
  - `git stash list` : stash의 리스트
  - `git stash` : 트래킹 되고 있는 파일들의 변경사항을 스택에 저장 
  - `git stash apply [stash]`: stash를 적용
  - `git stash pop [stash]`: stash를 적용하고 스택에서 바로 제거
  - `git stash drop [stash]`: stash를 스택에서 제거



### git의 Object, Commit, Head, Branch, Tag는 어떤 개념일까요? git 시스템은 프로젝트의 히스토리를 어떻게 저장할까요?
[git의 내부구조 및 동작원리](./git-internals.md)
####  Object
git은 버전 관리에 필요한 데이터를 Key-Value 형태의 Object로 변환합니다. 이때 key는 데이터를 SHA-1 알고리즘을 이용한 체크섬이 되고 Value는 데이터를 zlib 으로 압축한 값이 됩니다.
- blob object
  - 새로운 파일 혹은 변경된 파일이 커밋 되었을경우 해당 파일의 blob object 생성
- tree object
  - 상태(버전을)를 갖는 디렉토리 트리 노드
  - 커밋된 스냅샷의 Hierarchy 구조를 그림
- commit object
  - 커밋 정보와 해당 스냅샷의 루트 트리 노드키를 포함하는 commit object 생성
- tag object
  - Annotated tag 생성시 어떤 태크 메세지를 누가, 언제 달았고 어떤 커밋을 가리키는지에 대한 tag object 생성

#### Commit
- git은 데이터의 변경사항(델타)를 기록하지 않고 일련의 스냅샷으로 기록
- 스냅샷의 단위. 즉, 특정 버전

#### HEAD
- 현재 기준이 되는 커밋의 포인터 역할 Refs 혹은 SHA-1

#### Branch
- git의 커밋은 부모 커밋의 레퍼런스가 있기 때문에 전체 히스토리를 추적 가능
- 알기쉬운 이름을 붙여논 추적하기 원하는 스냅샷의 흐름중 가장 마지막 커밋을 포인터로 갖는 refs

#### Tag
- 특정 커밋에 메세지를 태깅
- Lightweight tag
  - 특정 커밋에 대한 포인터
  - tag refs -> commit object
- Annotated tag
  - 태그를 만든 사람의 이름, 이메일, 날짜, 태그 메시지 등을 기록한 tag object도 생성
  - tag refs -> tag object -> commit object


### 리모트 git 저장소에 원하지 않는 파일이 올라갔을 때 이를 되돌리려면 어떻게 해야 할까요?
가장 좋은 방법은 원하지 않는 파일이 트래킹 되지 않게 `.gitignore` 를 잘 작성하고 커밋시 hunk를 잘 비교하여 애초에 해당 문제를 막는 것입니다. 히스토리에 존재하여도 크게 문제가 되지 않는 파일이라면 해당 파일을 제거하는 커밋을 생성하거나 revert를 하여 푸시합니다.
히스토리에 존재하면 안되는 파일(credential 등)일 경우 git-filter-branch 커맨드를 활용하고 gc를 통해 해당 히스토리와 참조를 제거하거나 [BFG](https://rtyley.github.io/bfg-repo-cleaner/) 를 사용하여 제거하고 강제 푸시 합니다.

## Quest
* GitHub에 가입한 뒤, [이 커리큘럼의 GitHub 저장소](https://github.com/KnowRe-Dev/WebDevCurriculum)의 우상단의 Fork 버튼을 눌러 자신의 저장소에 복사해 둡니다.
* Windows의 경우 같이 설치된 git shell을, MacOSX의 경우 터미널을 실행시켜 커맨드라인에 들어간 뒤, 명령어를 이용하여 복사한 저장소를 clone합니다.
  * 앞으로의 git 작업은 되도록 커맨드라인을 통해 하는 것을 권장합니다.
* 이 문서가 있는 폴더 바로 밑에 있는 sandbox 폴더에 파일을 추가한 후 커밋해 보기도 하고, 파일을 삭제해 보기도 하고, 수정해 보기도 하면서 각각의 단계에서 커밋했을 때 어떤 것들이 저장되는지를 확인합니다.
* `clone`/`add`/`commit`/`push`/`pull`/`branch`/`stash` 명령을 충분히 익혔다고 생각되면, 자신의 저장소에 이력을 push합니다.

## Advanced
- Mercurial은 어떤 형상관리 시스템일까요? 어떤 장점이 있을까요?
  - Mercurial도 git과 마찬가지로 DVCS 입니다.
  - git과는 히스토리 모델로 스냅샷이 아닌 체인지셋(델타) 방식을 사용합니다.
  - 일반적으로 Mercurial이 git보다 단순하고 배우기 쉽다고 합니다.
  
- 실리콘밸리의 테크 대기업들은 어떤 형상관리 시스템을 쓰고 있을까요?
  - 2021현재 기업이 특정 VCS만 사용하는 경우는 드물고, 유의미한 통계도 찾기가 힘듭니다.
  - VCS 호스팅 서비스들은 SVN이나 Mercurial 같은 VCS의 지원을 점차 중단하고 대부분의 경우 git으로 대동단결 되고 있습니다.
  - 특정 산업군이나 규모가 크고 대용량의 code base나 바이너리를 다루는 프로젝트에서는 Perforce를 사용하기도 합니다.
  - 심지어 Helix4Git과 같은 솔루션으로 git과 연동해서 사용하기도 합니다. 
