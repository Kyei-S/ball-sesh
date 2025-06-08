// Jenkinsfile for Ball Sesh Platform - Author: Stephen Kyei
// CI/CD Pipeline: Checkout, Test, Build, Dockerize, Deploy

pipeline {
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
              bat 'npm ci'
              bat 'npm test -- --watchAll=false'
            }
          }
        }
        stage('Backend Test') {
          steps {
            dir('backend') {
              bat 'npm ci'
              bat 'npm test -- --watchAll=false'
            }
          }
        }
        stage('Admin Test') {
          steps {
            dir('admin') {
              bat 'npm ci'
              bat 'npm test -- --watchAll=false'
            }
          }
        }
      }
    }
    stage('Docker Build & Push') {
      steps {
        script {
          bat "docker build -t $REGISTRY/frontend:$IMAGE_TAG frontend/"
          bat "docker build -t $REGISTRY/backend:$IMAGE_TAG backend/"
          bat "docker build -t $REGISTRY/admin:$IMAGE_TAG admin/"
          bat "docker push $REGISTRY/frontend:$IMAGE_TAG"
          bat "docker push $REGISTRY/backend:$IMAGE_TAG"
          bat "docker push $REGISTRY/admin:$IMAGE_TAG"
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
