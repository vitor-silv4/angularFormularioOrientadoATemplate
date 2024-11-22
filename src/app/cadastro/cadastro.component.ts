import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  dataNascimentoInput: string = '';

  constructor(private router: Router, private consultaCepService: ConsultaCepService) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm){
    if(form.valid){
      this.router.navigate(['./sucesso'])
    }else{
      alert('Formulário inválido')
    }
      console.log(form);
  }

  validarDataNascimento(dataNascimento: string): boolean {
    const dataNascimentoObj = new Date(dataNascimento);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimentoObj.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDay();

    if (
      mesAtual < dataNascimentoObj.getMonth() ||
      (mesAtual === dataNascimentoObj.getMonth() && diaAtual < dataNascimentoObj.getDate())
    ) {
      return idade - 1 >= 18;
    }
    return idade >= 18;
  }

  consultaCep(ev: any, f: NgForm){
    const cep = ev.target.value;
    if(cep !== ''){
      this.consultaCepService.getConsultaCep(cep).subscribe(resultado => {
        this.populandoEndereco(resultado, f);
      });
    }else{
      return alert("Endereço de CEP inválido")
    }
  }
  populandoEndereco(resultado: any, f: NgForm) {
    f.form.patchValue({
      endereco: resultado.logradouro || '',
      complemento: resultado.complemento || '',
      bairro: resultado.bairro || '',
      cidade: resultado.localidade || '',
      estado: resultado.uf || ''
    });
  }

}
