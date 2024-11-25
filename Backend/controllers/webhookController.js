// // controllers/webhookController.js

// const axios = require("axios");
// const crypto = require("crypto");

// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// const SECRET = process.env.SECRET;

// const verifySignature = (req) => {
//   if (SECRET) {
//     const signature = req.headers["x-hub-signature-256"];
//     const hash = `sha256=${crypto
//       .createHmac("sha256", SECRET)
//       .update(JSON.stringify(req.body))
//       .digest("hex")}`;
//     return signature === hash;
//   }
//   return true;
// };

// const handleRepositoryCreated = async (repository) => {
//   try {
//     const owner = repository.owner.login;
//     const repo = repository.name;

//     const workflowContent = `
// name: CI

// on: [push, pull_request]

// jobs:
//   build:
//     runs-on: ubuntu-latest
//     steps:
//     - uses: actions/checkout@v2
//     - name: Run a one-line script
//       run: echo "Hello, world!"
//     `;

//     const contentBase64 = Buffer.from(workflowContent).toString("base64");

//     await axios.put(
//       `https://api.github.com/repos/${owner}/${repo}/contents/.github/workflows/ci.yml`,
//       {
//         message: "Add CI workflow",
//         content: contentBase64,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${GITHUB_TOKEN}`,
//           Accept: "application/vnd.github.v3+json",
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Error adding workflow:", error.message);
//   }
// };

// exports.handleWebhook = (req, res) => {
//   if (!verifySignature(req)) {
//     return res.status(401).send("Signature mismatch");
//   }

//   const event = req.headers["x-github-event"];
//   const { action, repository } = req.body;

//   if (event === "repository" && action === "created") {
//     handleRepositoryCreated(repository);
//     res.status(201).send("Workflow added successfully");
//   } else {
//     res.status(204).send("Event not handled");
//   }
// };







// const axios = require('axios');

// exports.handleWebhook = async (req, res) => {
//     const event = req.headers['x-github-event'];

//     if (event === 'repository' && req.body.action === 'created') {
//         const repoName = req.body.repository.name;
//         const owner = req.body.repository.owner.login;

//         // Define the workflow content (YAML as a string)
//         const workflowContent = `
// name: CI

// on:
//   push:
//     branches:
//       - main

// jobs:
//   build:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v2
//       - name: Run a sample step
//         run: echo "Hello, World!"
// `;

//         try {
//             // GitHub API to create the workflow file
//             await axios.put(
//                 `https://api.github.com/repos/${owner}/${repoName}/contents/.github/workflows/default.yml`, // Added `contents` in URL path
//                 {
//                     message: "Add default CI workflow",
//                     content: Buffer.from(workflowContent).toString('base64'), // Base64 encode the content
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer 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`, // Correct token format
//                         Accept: "application/vnd.github.v3+json",
//                     },
//                 }
//             );
//             console.log(`Workflow added to repository ${repoName}`);
//             res.status(200).send('Workflow added successfully');
//         } catch (error) {
//             console.error("Error adding workflow:", error.message); // Log the error message for easier debugging
//             res.status(500).send('Error adding workflow');
//         }
//     } else {
//         res.status(200).send('Event ignored');
//     }
// };

















// const axios = require('axios');

// exports.handleWebhook = async (req, res) => {
//     const event = req.headers['x-github-event'];

//     if (event === 'repository' && req.body.action === 'created') {
//         const repoName = req.body.repository.name;
//         const owner = req.body.repository.owner.login;

//         // Define content for the first YAML workflow file
//         const workflow1Content = `
// name: Store Repository Structure in MongoDB

// on:
//   push:
//     branches:
//       - main
//   schedule:
//     - cron: '0 0 * * *'

// jobs:
//   storeRepoStructure:
//     runs-on: ubuntu-latest
//     steps:
//       - name: Checkout code
//         uses: actions/checkout@v3
//       - name: Set up Python
//         uses: actions/setup-python@v3
//         with:
//           python-version: '3.8'
//       - name: Install dependencies
//         run: |
//           pip install PyGithub pymongo python-dotenv
//       - name: Store Repository Structure in MongoDB
//         env:
//           GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
//           MONGODB_URI: \${{ secrets.MONGODB_URI }}
//         run: |
//           python store_repo_structure.py
// `;

//         // Define content for the second YAML workflow file
//         const workflow2Content = `
// name: Store Repository Structure in MongoDB

// on:
//   push:
//     branches:
//       - '*'
//     paths:
//       - '/*.md'
//       - '/*.jpg'
//       - '/*.jpeg'
//       - '/*.png'
//       - '/*.mp4'
//       - 'assets/'

//   pull_request:
//     types: [opened, synchronize, reopened, closed]
//     paths:
//       - '/*.md'
//       - '/*.jpg'
//       - '/*.jpeg'
//       - '/*.png'
//       - '/*.mp4'
//       - 'assets/'

//   repository_dispatch:
//     types: [file_change]

//   schedule:
//     - cron: '0 0 * * *'

// jobs:
//   storeRepoStructure:
//     runs-on: ubuntu-latest
//     steps:
//       - name: Checkout code
//         uses: actions/checkout@v3
//         with:
//           fetch-depth: 0

//       - name: Set up Python
//         uses: actions/setup-python@v3
//         with:
//           python-version: '3.8'

//       - name: Install dependencies
//         run: |
//           pip install PyGithub pymongo python-dotenv

//       - name: Check for changes
//         id: changes
//         run: |
//           echo "Changes detected in repository"
//           echo "::set-output name=changed::true"

//       - name: Store Repository Structure in MongoDB
//         if: steps.changes.outputs.changed == 'true'
//         env:
//           GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
//           MONGODB_URI: \${{ secrets.MONGODB_URI }}
//         run: |
//           python store_repo_structure.py

//       - name: Notify on completion
//         if: always()
//         run: |
//           echo "Repository structure update completed"
// `;

//         // Helper function to create workflow file
//         const createWorkflowFile = async (filePath, fileContent) => {
//             await axios.put(
//                 `https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}`,
//                 {
//                     message: `Add workflow file ${filePath}`,
//                     content: Buffer.from(fileContent).toString('base64'), // Encode content to base64
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer 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`, // Use a secure token
//                         Accept: "application/vnd.github.v3+json",
//                     },
//                 }
//             );
//         };

//         try {
//             // Create the first workflow
//             await createWorkflowFile('.github/workflows/store_repo_structure.yml', workflow1Content);

//             // Create the second workflow
//             await createWorkflowFile('.github/workflows/store_repo_structure_extended.yml', workflow2Content);

//             console.log(`Workflows added to repository ${repoName}`);
//             res.status(200).send('Workflows added successfully');
//         } catch (error) {
//             console.error("Error adding workflows:", error.response?.data || error.message);
//             res.status(500).send('Error adding workflows');
//         }
//     } else {
//         res.status(200).send('Event ignored');
//     }
// };





const axios = require('axios');

exports.handleWebhook = async (req, res) => {
    const event = req.headers['x-github-event'];

    if (event === 'repository' && req.body.action === 'created') {
        const repoName = req.body.repository.name;
        const owner = req.body.repository.owner.login;

        // Define content for the first YAML workflow file
        const workflow1Content = `
name: Store Repository Structure in MongoDB

on:
  push:
    branches:
      - main
  schedule:
    - cron: '0 0 * * *'

jobs:
  storeRepoStructure:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v3
        with:
          python-version: '3.8'
      - name: Install dependencies
        run: |
          pip install PyGithub pymongo python-dotenv
      - name: Store Repository Structure in MongoDB
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          MONGODB_URI: "mongodb+srv://learnlink:learnlink@cluster0.ptp95.mongodb.net/learnlink"
        run: |
          python ./store_repo_structure.py
`;

        // Define content for the second YAML workflow file
        const workflow2Content = `
name: Store Repository Structure in MongoDB

on:
  push:
    branches:
      - '*'
    paths:
      - '/*.md'
      - '/*.jpg'
      - '/*.jpeg'
      - '/*.png'
      - '/*.mp4'
      - 'assets/'

  pull_request:
    types: [opened, synchronize, reopened, closed]
    paths:
      - '/*.md'
      - '/*.jpg'
      - '/*.jpeg'
      - '/*.png'
      - '/*.mp4'
      - 'assets/'

  repository_dispatch:
    types: [file_change]

  schedule:
    - cron: '0 0 * * *'

jobs:
  storeRepoStructure:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Set up Python
        uses: actions/setup-python@v3
        with:
          python-version: '3.8'

      - name: Install dependencies
        run: |
          pip install PyGithub pymongo python-dotenv

      - name: Check for changes
        id: changes
        run: |
          echo "Changes detected in repository"
          echo "::set-output name=changed::true"

      - name: Store Repository Structure in MongoDB
        if: steps.changes.outputs.changed == 'true'
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          MONGODB_URI: "mongodb+srv://learnlink:learnlink@cluster0.ptp95.mongodb.net/learnlink"
        run: |
          python ./store_repo_structure.py

      - name: Notify on completion
        if: always()
        run: |
          echo "Repository structure update completed"
`;

//        Define content for the Python file
//         const pythonFileContent = `
// import os
// import json
// from github import Github
// from pymongo import MongoClient
// from dotenv import load_dotenv
// import datetime

// # Load environment variables
// load_dotenv()
// GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
// MONGODB_URI = os.getenv('MONGODB_URI')

// def fetch_repo_structure(repo_name, owner):
//     g = Github(GITHUB_TOKEN)
//     repo = g.get_repo(f'{owner}/{repo_name}')
//     return process_folder(repo)

// def process_folder(repo, path=''):
//     contents = repo.get_contents(path)
//     folder_structure = {
//         'readme': None,
//         'media': [],
//         'assets': []
//     }
    
//     for item in contents:
//         if item.type == 'file':
//             raw_url = item.download_url
//             if item.name.lower() == 'readme.md':
//                 folder_structure['readme'] = raw_url
//             elif item.name.endswith(('.mp4', '.jpg', '.jpeg', '.png')):
//                 folder_structure['media'].append(raw_url)
//             else:
//                 folder_structure['assets'].append(raw_url)
//         elif item.type == 'dir':
//             folder_structure[item.name] = process_folder(repo, item.path)
    
//     return folder_structure

// def store_in_mongodb(repo_name, structure):
//     client = MongoClient(MONGODB_URI)
//     db = client['myDatabase']
//     collection = db['repoStructures']
    
//     collection.update_one(
//         {'repo': repo_name},
//         {
//             '$set': {
//                 'structure': structure,
//                 'lastUpdated': datetime.datetime.utcnow()
//             }
//         },
//         upsert=True
//     )
//     print('Repository structure stored successfully')

// def main():
//     repo_full_name = os.getenv('GITHUB_REPOSITORY')
//     owner, repo_name = repo_full_name.split('/')
//     structure = fetch_repo_structure(repo_name, owner)
//     store_in_mongodb(repo_name, structure)

// if __name__ == '__main__':
//     main()
// `;



const pythonFileContent = `
import os
import json
from github import Github
from pymongo import MongoClient
from dotenv import load_dotenv
import datetime

# Load environment variables
load_dotenv()
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
MONGODB_URI = os.getenv('MONGODB_URI')

# Define excluded paths and files
EXCLUDED_PATHS = {
    '.github/workflows',
    '.github'
}

EXCLUDED_FILES = {
    'store_repo_structure.py',
    'store_repo_structure.yml',
    'store_repo_structure_extended.yml'
}

def should_exclude(path, name):
    """
    Check if the path or file should be excluded
    
    Args:
        path (str): The path to check
        name (str): The file name to check
        
    Returns:
        bool: True if should be excluded, False otherwise
    """
    # Check if path is in excluded paths
    if any(path.startswith(excluded) for excluded in EXCLUDED_PATHS):
        return True
        
    # Check if file name is in excluded files
    if name in EXCLUDED_FILES:
        return True
        
    return False

def fetch_repo_structure(repo_name, owner):
    """
    Fetch repository structure excluding workflow files
    
    Args:
        repo_name (str): Name of the repository
        owner (str): Owner of the repository
        
    Returns:
        dict: Repository structure
    """
    g = Github(GITHUB_TOKEN)
    repo = g.get_repo(f'{owner}/{repo_name}')
    return process_folder(repo)

def process_folder(repo, path=''):
    """
    Process repository folder and create structure
    
    Args:
        repo: GitHub repository object
        path (str): Current path being processed
        
    Returns:
        dict: Folder structure
    """
    try:
        contents = repo.get_contents(path)
        folder_structure = {
            'readme': None,
            'media': [],
            'assets': []
        }
        
        for item in contents:
            # Skip excluded paths and files
            if should_exclude(item.path, item.name):
                continue
                
            if item.type == 'file':
                raw_url = item.download_url
                if item.name.lower() == 'readme.md':
                    folder_structure['readme'] = raw_url
                elif item.name.endswith(('.mp4', '.jpg', '.jpeg', '.png', '.gif')):
                    folder_structure['media'].append({
                       # 'name': item.name,
                        'url': raw_url,
                        # 'path': item.path
                    })
                else:
                    folder_structure['assets'].append({
                        # 'name': item.name,
                        'url': raw_url,
                        # 'path': item.path
                    })
            elif item.type == 'dir':
                # Process subdirectory only if not excluded
                if not should_exclude(item.path, item.name):
                    subfolder = process_folder(repo, item.path)
                    if any(subfolder.values()):  # Only add non-empty folders
                        folder_structure[item.name] = subfolder
        
        # Clean up empty lists and None values
        return {k: v for k, v in folder_structure.items() if v and (isinstance(v, dict) or len(v) > 0)}
        
    except Exception as e:
        print(f"Error processing path {path}: {str(e)}")
        return {}

def store_in_mongodb(repo_name, structure):
    """
    Store repository structure in MongoDB
    
    Args:
        repo_name (str): Name of the repository
        structure (dict): Repository structure to store
    """
    try:
        client = MongoClient(MONGODB_URI)
        db = client['myDatabase']
        collection = db['repoStructures']
        
        # Add metadata to the structure
        document = {
            'repo': repo_name,
            'structure': structure,
            'lastUpdated': datetime.datetime.utcnow(),
            'totalFiles': count_files(structure)
        }
        
        collection.update_one(
            {'repo': repo_name},
            {'$set': document},
            upsert=True
        )
        print(f'Repository structure for {repo_name} stored successfully')
        
    except Exception as e:
        print(f"Error storing in MongoDB: {str(e)}")
    finally:
        client.close()

def count_files(structure):
    """
    Count total files in the structure
    
    Args:
        structure (dict): Repository structure
        
    Returns:
        int: Total number of files
    """
    total = 0
    if isinstance(structure, dict):
        for key, value in structure.items():
            if key == 'media':
                total += len(value)
            elif key == 'assets':
                total += len(value)
            elif key == 'readme' and value is not None:
                total += 1
            elif isinstance(value, dict):
                total += count_files(value)
    return total

def main():
    """
    Main function to execute the repository structure storage
    """
    try:
        repo_full_name = os.getenv('GITHUB_REPOSITORY')
        if not repo_full_name:
            raise ValueError("GITHUB_REPOSITORY environment variable not set")
            
        owner, repo_name = repo_full_name.split('/')
        structure = fetch_repo_structure(repo_name, owner)
        store_in_mongodb(repo_name, structure)
        
    except Exception as e:
        print(f"Error in main execution: {str(e)}")

if __name__ == '__main__':
    main()

`

        // Helper function to create a file in the repository
        const createFileInRepo = async (filePath, fileContent) => {
            await axios.put(
                `https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}`,
                {
                    message: `Add ${filePath}`,
                    content: Buffer.from(fileContent).toString('base64'), // Encode content to base64
                },
                {
                    headers: {
                        Authorization: `Bearer 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`, // Replace with secure token
                        Accept: "application/vnd.github.v3+json",
                    },
                }
            );
        };

        try {
            // Create the first workflow file
            await createFileInRepo('.github/workflows/store_repo_structure.yml', workflow1Content);

            // Create the second workflow file
            await createFileInRepo('.github/workflows/store_repo_structure_extended.yml', workflow2Content);

            // Create the Python script in the root directory
            await createFileInRepo('store_repo_structure.py', pythonFileContent);

            console.log(`Workflows and Python script added to repository ${repoName}`);
            res.status(200).send('Workflows and Python script added successfully');
        } catch (error) {
            console.error("Error adding files:", error.response?.data || error.message);
            res.status(500).send('Error adding files');
        }
    } else {
        res.status(200).send('Event ignored');
    }
};
