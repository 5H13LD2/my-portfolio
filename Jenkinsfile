pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS-20', type: 'NodeJS'
        PATH = "${env.NODE_HOME}/bin:${env.PATH}"
        DEPLOY_USER = 'ubuntu'
        DEPLOY_HOST = '3.106.53.241'
        DEPLOY_PATH = '/var/www/portfolio'
        SSH_KEY = '~/Desktop/jerico-key.pem' // Updated to match your local setup
        CONTAINER_NAME = 'portfolio-container'
        NPM_CACHE = '.npm'
    }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'rm -rf node_modules'
                sh "npm ci --cache ${NPM_CACHE} --prefer-offline"
            }
        }

        stage('Lint & Build') {
            parallel {
                stage('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage('Build') {
                    steps {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Ensure target directory exists and is writable, and backup existing deployment
                    sh """
                    ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} '
                        if [ ! -d "${DEPLOY_PATH}" ]; then
                            sudo mkdir -p ${DEPLOY_PATH}
                            sudo chown ${DEPLOY_USER}:${DEPLOY_USER} ${DEPLOY_PATH}
                        else
                            # Backup existing directory before deploying
                            BACKUP_DIR="${DEPLOY_PATH}_backup_\$(date +%Y%m%d_%H%M%S)"
                            sudo cp -r ${DEPLOY_PATH} \$BACKUP_DIR
                            echo "Backup created at \$BACKUP_DIR"
                        fi
                    '
                    
                    # Sync files and restart container
                    rsync -avz --delete -e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no" --rsync-path="sudo rsync" dist/ ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/
                    ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} 'sudo docker restart ${CONTAINER_NAME}'
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build & Deploy successful!"
        }
        failure {
            echo "❌ Build or Deploy failed!"
        }
        always {
            echo "Build finished at ${new Date()}"
        }
    }
}