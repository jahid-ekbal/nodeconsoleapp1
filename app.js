console.log("Hello world");
import fetch from "node-fetch";
const GITHUB_USERNAME = "jahid-ekbal";
const SOCIAL_LINKS = {
    github: "https://github.com/jahid-ekbal",
    linkedin: "https://www.linkedin.com/in/jahid-developer",
    facebook: "https://www.facebook.com/jahidekbalmallick",
    twitter: "https://x.com/JAHIDEKBAL01",
    website: "https://sites.google.com/view/jahidekbal", // example from your portfolio site​
};
async function fetchGitHubUser(username) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
        throw new Error(`GitHub user fetch failed with status ${res.status}`);
    }
    return (await res.json());
}
async function fetchGitHubRepos(username) {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    if (!res.ok) {
        throw new Error(`GitHub repos fetch failed with status ${res.status}`);
    }
    return (await res.json());
}
function printHeader(title) {
    console.log("\n========================================");
    console.log(title.toUpperCase());
    console.log("========================================\n");
}
function printUserInfo(user) {
    printHeader("Developer Profile");
    console.log(`Name: ${user.name ?? user.login}`);
    console.log(`GitHub: ${user.html_url}`);
    console.log(`Bio: ${user.bio ?? "N/A"}`);
    console.log(`Repos: ${user.public_repos}`);
    console.log(`Followers: ${user.followers}`);
    console.log(`Following: ${user.following}`);
}
function printRepos(repos) {
    printHeader("Highlighted Repositories");
    if (repos.length === 0) {
        console.log("No repositories found.");
        return;
    }
    repos.forEach((repo, index) => {
        console.log(`#${index + 1}: ${repo.name}`);
        console.log(`URL: ${repo.html_url}`);
        console.log(`Stars: ${repo.stargazers_count}`);
        console.log(`Language: ${repo.language ?? "N/A"}`);
        console.log(`About: ${repo.description ?? "No description."}`);
        console.log("");
    });
}
function printSocialLinks() {
    printHeader("Connect With Me");
    Object.entries(SOCIAL_LINKS).forEach(([key, value]) => {
        if (value) {
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            console.log(`${label}: ${value}`);
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
        printUserInfo(user);
        printRepos(repos);
        printSocialLinks();
    }
    catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=app.js.map