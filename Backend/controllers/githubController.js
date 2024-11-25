// controllers/githubController.js
const dotenv = require('dotenv');
dotenv.config();

async function manageRepo(req, res) {
    try {
        const { Octokit } = await import("@octokit/rest");
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const octokit = new Octokit({ auth: GITHUB_TOKEN });

        const { action, repoName, collaborator, forkOwner, forkRepo } = req.body;

        if (action === 'create') {
            // Create a new repository
            const repoResponse = await octokit.repos.createForAuthenticatedUser({
                name: repoName,
                auto_init: true,
                private: false
            });

            // Add a collaborator to the repository, if provided
            if (collaborator) {
                await octokit.repos.addCollaborator({
                    owner: repoResponse.data.owner.login,
                    repo: repoName,
                    username: collaborator
                });
            }

            console.log("Here ")

            res.json({
                success: true,
                message: 'Repository created and collaborator added successfully',
                repoUrl: repoResponse.data.html_url
            });

        } else if (action === 'fork') {
            // Fork an existing repository
            if (!forkOwner || !forkRepo) {
                return res.status(400).json({
                    success: false,
                    message: 'Forking requires both forkOwner and forkRepo fields'
                });
            }

            const forkResponse = await octokit.repos.createFork({
                owner: forkOwner,
                repo: forkRepo
            });

            res.json({
                success: true,
                message: 'Repository forked successfully',
                forkUrl: forkResponse.data.html_url
            });

        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid action. Choose either "create" or "fork".'
            });
        }

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to create or fork repository',
            error: error.message
        });
    }
}

module.exports = { manageRepo };
