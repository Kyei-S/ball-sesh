// Jenkinsfile for Ball Sesh Platform - Author: Stephen Kyei
// CI/CD Pipeline: Checkout, Test, Build, Dockerize, Deploy

  agent any

  environment {
    REGISTRY = "stephenkyei"
    IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Build & Test') {
      parallel {
        stage('Frontend Test') {
          steps {
            dir('frontend') {
              sh 'npm ci'
              sh 'npm test -- --watchAll=false'
            }
          }
        }
        stage('Backend Test') {
          steps {
            dir('backend') {
              sh 'npm ci'
              sh 'npm test -- --watchAll=false'
            }
          }
        }
        stage('Admin Test') {
          steps {
            dir('admin') {
              sh 'npm ci'
              sh 'npm test -- --watchAll=false'
            }
          }
        }
      }
    }
    stage('Docker Build & Push') {
      steps {
        script {
          sh "docker build -t $REGISTRY/frontend:$IMAGE_TAG frontend/"
          sh "docker build -t $REGISTRY/backend:$IMAGE_TAG backend/"
          sh "docker build -t $REGISTRY/admin:$IMAGE_TAG admin/"
          sh "docker push $REGISTRY/frontend:$IMAGE_TAG"
          sh "docker push $REGISTRY/backend:$IMAGE_TAG"
          sh "docker push $REGISTRY/admin:$IMAGE_TAG"
        }
      }
    }
    stage('Deploy (Kubernetes)') {
      steps {
        echo "Here you would deploy using kubectl or Helm (not enabled in demo)."
        // sh "kubectl apply -f k8s/deployment.yaml"
      }
    }
  }
  post {
    success { echo 'Deployment successful!' }
    failure { echo "Build failed: ${env.BUILD_NUMBER}" }
  }
}
