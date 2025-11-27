import fetch from "node-fetch";
const GITHUB_USERNAME = "jahid-ekbal";
// Color codes for terminal output
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    white: "\x1b[37m",
    red: "\x1b[31m",
    bgBlue: "\x1b[44m",
    bgCyan: "\x1b[46m",
};
const SOCIAL_LINKS = {
    github: "https://github.com/jahid-ekbal",
    linkedin: "https://www.linkedin.com/in/jahid-developer",
    facebook: "https://www.facebook.com/jahidekbalmallick",
    twitter: "https://x.com/JAHIDEKBAL01",
    website: "https://sites.google.com/view/jahidekbal",
};
// Language color mapping
const languageColors = {
    typescript: colors.cyan,
    javascript: colors.yellow,
    python: colors.blue,
    java: colors.red,
    csharp: colors.magenta,
    cpp: colors.cyan,
    rust: colors.red,
    go: colors.cyan,
    php: colors.magenta,
    ruby: colors.red,
    html: colors.red,
    css: colors.blue,
    react: colors.cyan,
    node: colors.green,
};
// Skills based on common languages found in repos
const skillsMap = {
    typescript: "TypeScript",
    javascript: "JavaScript",
    python: "Python",
    java: "Java",
    csharp: "C#",
    cpp: "C++",
    rust: "Rust",
    go: "Go",
    php: "PHP",
    ruby: "Ruby",
    html: "HTML",
    css: "CSS",
    react: "React",
    node: "Node.js",
    sql: "SQL",
    mongodb: "MongoDB",
    postgresql: "PostgreSQL",
};
async function fetchGitHubUser(username) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
        throw new Error(`GitHub user fetch failed with status ${res.status}`);
    }
    return (await res.json());
}
async function fetchGitHubRepos(username) {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=15`);
    if (!res.ok) {
        throw new Error(`GitHub repos fetch failed with status ${res.status}`);
    }
    return (await res.json());
}
function getLanguageColor(language) {
    if (!language)
        return colors.white;
    return languageColors[language.toLowerCase()] || colors.white;
}
function printBrandingHeader(user) {
    // Top border
    console.log(`${colors.bright}${colors.cyan}${"═".repeat(70)}${colors.reset}`);
    // GitHub logo
    console.log(`${colors.bright}${colors.white}
  ██████╗ ██╗████████╗██╗  ██╗██╗   ██╗██████╗ 
 ██╔════╝ ██║╚══██╔══╝██║  ██║██║   ██║██╔══██╗
 ██║  ███╗██║   ██║   ███████║██║   ██║██████╔╝
 ██║   ██║██║   ██║   ██╔══██║██║   ██║██╔══██╗
 ╚██████╔╝██║   ██║   ██║  ██║╚██████╔╝██████╔╝
  ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ 
${colors.reset}`);
    // Print the logo in a colorful animated way
    console.log("\n");
    // Define the awesome ASCII art logo
    const logoLines = [
        "    ██████╗ ███████╗██╗   ██╗███████╗██╗      ██████╗ ██████╗ ███████╗██████╗ ",
        "    ██╔══██╗██╔════╝██║   ██║██╔════╝██║     ██╔═══██╗██╔══██╗██╔════╝██╔══██╗",
        "    ██║  ██║█████╗  ██║   ██║█████╗  ██║     ██║   ██║██████╔╝█████╗  ██║  ██║",
        "    ██║  ██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║     ██║   ██║██╔═══╝ ██╔══╝  ██║  ██║",
        "    ██████╔╝███████╗ ╚████╔╝ ███████╗███████╗╚██████╔╝██║     ███████╗██████╔╝",
        "    ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═════╝ ",
    ];
    // Rainbow gradient colors for smooth animation effect
    const rainbowColors = [
        "\x1b[38;5;196m", // Red
        "\x1b[38;5;208m", // Orange
        "\x1b[38;5;226m", // Yellow
        "\x1b[38;5;46m", // Green
        "\x1b[38;5;51m", // Cyan
        "\x1b[38;5;201m", // Magenta
    ];
    // Display logo with animated gradient effect
    console.log(`${colors.bright}${colors.cyan}${"═".repeat(90)}${colors.reset}`);
    for (let i = 0; i < logoLines.length; i++) {
        const colorCode = rainbowColors[i % rainbowColors.length];
        process.stdout.write(`${colorCode}${colors.bright}${logoLines[i]}${colors.reset}\n`);
    }
    console.log(`${colors.bright}${colors.cyan}${"═".repeat(90)}${colors.reset}`);
    console.log(`${colors.bright}${colors.magenta}${"  ".repeat(22)}✨ WELCOME TO MY DIGITAL PORTFOLIO ✨${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}${"═".repeat(90)}${colors.reset}\n`);
    // Name branding
    const name = user.name ?? user.login;
    const nameWidth = name.length + 4;
    const centerPadding = Math.max(0, Math.floor((70 - nameWidth) / 2));
    console.log(`${" ".repeat(centerPadding)}${colors.bright}${colors.green}◆ ${name.toUpperCase()} ◆${colors.reset}`);
    // Avatar URL reference
    console.log(`${" ".repeat(centerPadding - 5)}${colors.bright}${colors.magenta}Avatar: ${user.avatar_url}${colors.reset}`);
    // Subtitle
    console.log(`${colors.bright}${colors.cyan}${"─".repeat(70)}${colors.reset}
${" ".repeat(15)}${colors.bright}${colors.yellow}💻 Developer Profile & Portfolio 💻${colors.reset}
${colors.bright}${colors.cyan}${"═".repeat(70)}${colors.reset}
`);
}
function printHeader(title) {
    const width = 60;
    const padding = Math.max(0, Math.floor((width - title.length - 2) / 2));
    const line = "═".repeat(width);
    console.log(`\n${colors.bright}${colors.cyan}${line}${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}${"═".repeat(padding)}  ${title.toUpperCase()}  ${"═".repeat(padding)}${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}${line}${colors.reset}\n`);
}
function printUserInfo(user) {
    printHeader("👤 Developer Profile");
    console.log(`${colors.bright}${colors.cyan}┌─ JAHID EKBAL (${user.login}) ─┐${colors.reset}
		${colors.bright}${colors.green}└─ Full Stack Developer ─┘${colors.reset}`);
    console.log(`${colors.bright}${colors.green}→ Full Name:${colors.reset} ${user.name ?? "Jahid Ekbal"}`);
    console.log(`${colors.bright}${colors.green}→ Bio:${colors.reset} ${user.bio ?? "No bio available"}`);
    console.log(`${colors.bright}${colors.green}→ Location:${colors.reset} GitHub Profile`);
    console.log(`\n${colors.bright}${colors.cyan}📊 STATISTICS:${colors.reset}`);
    console.log(`   ${colors.yellow}Public Repositories:${colors.reset} ${user.public_repos}`);
    console.log(`   ${colors.magenta}GitHub Followers:${colors.reset} ${user.followers}`);
    console.log(`   ${colors.blue}Following:${colors.reset} ${user.following}`);
    console.log(`\n${colors.bright}${colors.green}→ GitHub Profile:${colors.reset} ${user.html_url}`);
    console.log(`${colors.bright}${colors.cyan}→ Avatar URL:${colors.reset} ${user.avatar_url}`);
}
function extractSkills(repos) {
    const skillsSet = new Set();
    repos.forEach((repo) => {
        if (repo.language) {
            skillsSet.add(repo.language.toLowerCase());
        }
    });
    // Add common skills that might not show up as languages
    return Array.from(skillsSet).sort();
}
function printSkills(skills) {
    if (skills.length === 0)
        return;
    printHeader("🛠️  Skills & Technologies");
    const skillsByCategory = {
        languages: skills.filter((s) => [
            "typescript",
            "javascript",
            "python",
            "java",
            "csharp",
            "cpp",
            "rust",
            "go",
            "php",
            "ruby",
        ].includes(s)),
        frontend: skills.filter((s) => ["html", "css", "react"].includes(s)),
        backend: skills.filter((s) => ["node", "python", "java"].includes(s)),
        other: skills.filter((s) => ![
            "typescript",
            "javascript",
            "python",
            "java",
            "csharp",
            "cpp",
            "rust",
            "go",
            "php",
            "ruby",
            "html",
            "css",
            "react",
            "node",
        ].includes(s)),
    };
    if (skillsByCategory.languages.length > 0) {
        console.log(`${colors.bright}${colors.cyan}Languages:${colors.reset}`);
        skillsByCategory.languages.forEach((skill) => {
            const skillColor = getLanguageColor(skill);
            console.log(`  ${skillColor}■${colors.reset} ${skillsMap[skill] || skill}`);
        });
    }
    if (skillsByCategory.frontend.length > 0) {
        console.log(`\n${colors.bright}${colors.cyan}Frontend:${colors.reset}`);
        skillsByCategory.frontend.forEach((skill) => {
            console.log(`  ${colors.yellow}■${colors.reset} ${skillsMap[skill] || skill}`);
        });
    }
    if (skillsByCategory.backend.length > 0) {
        console.log(`\n${colors.bright}${colors.cyan}Backend:${colors.reset}`);
        skillsByCategory.backend.forEach((skill) => {
            console.log(`  ${colors.green}■${colors.reset} ${skillsMap[skill] || skill}`);
        });
    }
    if (skillsByCategory.other.length > 0) {
        console.log(`\n${colors.bright}${colors.cyan}Other:${colors.reset}`);
        skillsByCategory.other.forEach((skill) => {
            console.log(`  ${colors.magenta}■${colors.reset} ${skillsMap[skill] || skill}`);
        });
    }
}
function printRepos(repos) {
    printHeader("📚 Highlighted Repositories");
    if (repos.length === 0) {
        console.log(`${colors.red}No repositories found.${colors.reset}`);
        return;
    }
    repos.slice(0, 10).forEach((repo, index) => {
        const langColor = getLanguageColor(repo.language);
        console.log(`${colors.bright}${colors.cyan}#${index + 1}. ${repo.name}${colors.reset}`);
        console.log(`   ${colors.blue}URL:${colors.reset} ${repo.html_url}`);
        console.log(`   ${colors.yellow}⭐ Stars:${colors.reset} ${repo.stargazers_count} | ${langColor}Language:${colors.reset} ${repo.language ?? "N/A"}`);
        if (repo.description) {
            console.log(`   ${colors.green}📝 About:${colors.reset} ${repo.description}`);
        }
        console.log("");
    });
}
function printSocialLinks() {
    printHeader("🌐 Connect With Me");
    const socialEmojis = {
        github: "🐙",
        linkedin: "💼",
        facebook: "👤",
        twitter: "🐦",
        website: "🌍",
    };
    Object.entries(SOCIAL_LINKS).forEach(([key, value]) => {
        if (value) {
            const emoji = socialEmojis[key] || "🔗";
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            console.log(`${colors.bright}${colors.cyan}${emoji}  ${label}:${colors.reset} ${value}`);
        }
    });
}
async function main() {
    try {
        const [user, repos] = await Promise.all([
            fetchGitHubUser("jahid-ekbal"),
            fetchGitHubRepos("jahid-ekbal"),
        ]);
        console.clear();
        printBrandingHeader(user);
        printUserInfo(user);
        const skills = extractSkills(repos);
        if (skills.length > 0) {
            printSkills(skills);
        }
        printRepos(repos);
        printSocialLinks();
        console.log(`\n${colors.bright}${colors.green}✓ Profile loaded successfully for ${user.name ?? user.login}!${colors.reset}\n`);
        console.log(`${colors.bright}${colors.yellow}📸 Profile Picture:${colors.reset} ${user.avatar_url}\n`);
    }
    catch (error) {
        console.error(`${colors.red}✗ Error: ${error.message}${colors.reset}`);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=app.js.map