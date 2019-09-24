export type AppInfo = {
  name: string;
  path: string;
  icon: string;
};

export type Shortcut = {
  [key: string]: AppInfo[];
};

export const initialData: Shortcut = {
         "1": [
           {
             name: "ForkLift",
             path: "/Applications/ForkLift.app",
             icon:
               "https://res.cloudinary.com/konbu310/image/upload/v1568127101/Launcer/forklift.png"
           }
         ],
         "2": [
           {
             name: "iTerm",
             path: "/Applications/iTerm.app",
             icon:
               "https://res.cloudinary.com/konbu310/image/upload/v1568127177/Launcer/iterm.png"
           }
         ],
         "3": [
           {
             name: "IntelliJ IDEA",
             path: "Applications/IntelliJ IDEA.app",
             icon:
               "https://res.cloudinary.com/konbu310/image/upload/v1568727341/Launcer/intellij_idea.png"
           },
           {
             name: "VS Code",
             path: "/Applications/Visual Studio Code.app",
             icon:
               "https://res.cloudinary.com/konbu310/image/upload/v1568127173/Launcer/vscode.png"
           },
           {
             name: "CodeSandbox",
             path: "/Applications/CodeSandbox.app",
             icon:
               "https://res.cloudinary.com/konbu310/image/upload/v1568127100/Launcer/codesandbox.png"
           }
         ],
         "4": [
           {
             name: "Chrome",
             path: "/Applications/Google Chrome.app",
             icon:
               "https://res.cloudinary.com/konbu310/image/upload/v1568127099/Launcer/chrome.png"
           }
         ],
         "5": [
           {
             name: "Slack",
             path: "/Applications/Slack.app",
             icon:
               "https://res.cloudinary.com/konbu310/image/upload/v1568127174/Launcer/slack.png"
           }
         ],
         "6": [
           {
             name: "Gihub Desktop",
             path: "/Applications/Github Desktop.app",
             icon:
               "https://res.cloudinary.com/konbu310/image/upload/v1568127178/Launcer/github.png"
           }
         ],
         "7": [
           {
             name: "Spark",
             path: "/Applications/Spark.app",
             icon:
               "https://res.cloudinary.com/konbu310/image/upload/v1568127180/Launcer/spark.png"
           }
         ],
         "8": [
           {
             name: "LINE",
             path: "/Applications/LINE.app",
             icon:
               "https://res.cloudinary.com/konbu310/image/upload/v1568127176/Launcer/line.png"
           }
         ],
         "9": [
           {
             name: "PMenu",
             path: "/Applications/PMenu.app",
             icon: ""
           }
         ]
       };
