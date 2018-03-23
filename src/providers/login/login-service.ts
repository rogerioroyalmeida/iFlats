import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../model/usuario';

@Injectable()
export class LoginService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  createUser(usuario: Usuario) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(usuario.getEmail(), usuario.getSenha());
  }

  signIn(usuario: Usuario) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(usuario.getEmail(), usuario.getSenha());
  }

  signOut() {
    return this.angularFireAuth.auth.signOut();
  }

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }
}
