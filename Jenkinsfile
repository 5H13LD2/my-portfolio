pipeline {
    agent any
    
    // You can adjust the Node.js tool name if you have configured it differently in Jenkins Global Tool Configuration
    environment {
        NODE_HOME = tool name: 'NodeJS-20', type: 'NodeJS'
        PATH = "${env.NODE_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Code Quality') {
            steps {
                // Runs the lint script defined in your package.json
                sh 'npm run lint'
            }
        }
        
        stage('Build') {
            steps {
                // Runs the build script defined in your package.json
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Build completed. Replace this with your deployment script!'
                // Example deployment commands (Uncomment and adjust for your server):
                // sh '''
                // scp -r ./dist user@server:/path/to/deploy
                // ssh user@server "cd /path/to/deploy && pm2 restart app"
                // '''
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline Succeeded ✅'
        }
        failure {
            echo 'Pipeline Failed ❌'
        }
    }
}
//asdasd