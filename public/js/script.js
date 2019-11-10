
            function validar(){
              var email = login.name.value;
              var senha = login.senha.value;
          
              if(nome == ""){
                  alert("digite seu email")
                  loginEmail.name.focus() 
                  return false;
              }
          
              if(senha == ""){
                  alert("digite sua senha");
                  loginEmail.senha.focus();
              }
          }
    