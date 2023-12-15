	pipeline {
    agent {
        label 'Agente_Pipeline'
    }
    environment {
        RESULTADOSTAGE = '' 
        RESULTADOKEYJIRA = ''
        JIRASERVER = 'Jira Connect'
   }    
    stages {
        
        stage('Clean Past Tests') {
            steps {
                bat 'gradle clean'
            }
        }        
        stage('Excecute Test') {
            steps {
                script {
                    if('Bug' == JIRA_ISSUE_SUMMARY.split(':')[0]){
                          bat 'gradle test -Dcucumber.options="--tags @' + JIRA_ISSUE_SUMMARY.split('caso de prueba ')[1] +'"'
                    }else{
                         bat 'gradle test -Dcucumber.options="--tags @' + JIRA_ISSUE_KEY +'"'
                    }
                }
            }
        }                
        stage('save log build') {
            steps {
            script {
                    echo JIRA_ISSUE_KEY
                    echo JIRA_ISSUE_SUMMARY                
                }
            }
        }        
    }    
    post {
          success {
              script {  
                  if('Bug' == JIRA_ISSUE_SUMMARY.split(':')[0]){
                      def transitionInput =
                        [
                            transition: [
                                id: '31'
                            ]
                        ]
                      jiraTransitionIssue idOrKey: JIRA_ISSUE_KEY, input: transitionInput, site: JIRASERVER
                      jiraAddComment comment: 'Bug ' + JIRA_ISSUE_KEY + ' closed sucessfully!', idOrKey: JIRA_ISSUE_SUMMARY.split('caso de prueba ')[1], site: JIRASERVER
                      jiraAddComment comment: 'Bug ' + JIRA_ISSUE_KEY + ' executed sucessfully!', idOrKey: JIRA_ISSUE_KEY, site: JIRASERVER
                      jiraUploadAttachment file: 'reporteKraken/Evidencia Automatizacion de Pruebas.docx', idOrKey: JIRA_ISSUE_KEY, site: JIRASERVER
                  }else{
                        jiraAddComment comment: 'Test ' + JIRA_ISSUE_KEY + ' executed sucessfully!', idOrKey: JIRA_ISSUE_KEY, site: JIRASERVER
                        jiraUploadAttachment file: 'reporteKraken/Evidencia Automatizacion de Pruebas.docx', idOrKey: JIRA_ISSUE_KEY, site: JIRASERVER
                  }
              }
          }
          failure {
            script {
                  if('Bug' == JIRA_ISSUE_SUMMARY.split(':')[0]){
                      jiraAddComment comment: 'Bug ' + JIRA_ISSUE_KEY + ' executed with failure!', idOrKey: JIRA_ISSUE_KEY, site: JIRASERVER
                      jiraUploadAttachment file: 'reporteKraken/Evidencia Automatizacion de Pruebas.docx', idOrKey: JIRA_ISSUE_KEY, site: JIRASERVER
                  }else{
                     def testIssue = [fields: [ project: [id: '10001'],
                                 summary: 'Bug: Error en la ejecucion de las pruebas del caso de prueba ' + JIRA_ISSUE_KEY,
                                 description: 'Se encuentra error en la ejecucion de las pruebas del caso de prueba ' + JIRA_ISSUE_KEY + ' adjunto evidencia de las pruebas.',
                                 issuetype: [name: 'Bug']]]
                      response = jiraNewIssue issue: testIssue, site: JIRASERVER
                      echo response.successful.toString()
                      echo response.data.toString()
                      def ISSUE_NEW_KEY = response.data.toString()
                      echo 'Asignacion de nuevo bug a la trasabilidad del test ' + JIRA_ISSUE_KEY + ' '
                      jiraLinkIssues type: 'Relates', inwardKey: JIRA_ISSUE_KEY, outwardKey: ISSUE_NEW_KEY.split(', ')[1].split(':')[1], site: JIRASERVER
                      echo 'Comentario en el test ' + JIRA_ISSUE_KEY + ' '
                      jiraAddComment comment: 'Bug ' + ISSUE_NEW_KEY.split(', ')[1].split(':')[1] + ' created sucessfully!', idOrKey: JIRA_ISSUE_KEY, site: JIRASERVER
                      jiraUploadAttachment file: 'reporteKraken/Evidencia Automatizacion de Pruebas.docx', idOrKey: ISSUE_NEW_KEY.split(', ')[1].split(':')[1], site: JIRASERVER
                  }
              }
          }
    }
}
