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
                sh 'npm ci --cache .npm --prefer-offline'
            }
        }
        
        stage('Lint and Build') {
            parallel {
                stage('Lint') {
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
            }
        }
        
        stage('Deploy') {
            steps {
                sh """
                rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no -i ~/Desktop/jerico-key.pem" dist/ ubuntu@3.106.53.241:/var/www/portfolio/
                ssh -o StrictHostKeyChecking=no -i ~/Desktop/jerico-key.pem ubuntu@3.106.53.241 "sudo docker restart portfolio-container"
                """
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline finished executing! 🏁'
        }
        success {
            echo 'Pipeline Succeeded ✅'
            // e.g. slackSend channel: '#builds', color: 'good', message: "Build Successful: ${env.JOB_NAME} [${env.BUILD_NUMBER}]"
        }
        failure {
            echo 'Pipeline Failed ❌'
            // e.g. slackSend channel: '#builds', color: 'danger', message: "Build Failed: ${env.JOB_NAME} [${env.BUILD_NUMBER}]"
        }
    }
}
//asdasd