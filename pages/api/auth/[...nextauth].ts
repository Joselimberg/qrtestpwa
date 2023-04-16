import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

// import { checkUserEmailPassword } from '../../../config/dbUser';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    
    // ...add more providers here

    // Credentials({
    //   name: 'Custom Login',
    //   credentials: {
    //     email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
    //     password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
    //   },
    //   async authorize(credentials) {
    //     // console.log({credentials});
    //     // return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };

    //     return await checkUserEmailPassword( credentials!.email, credentials!.password );
    //     // return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };

    //   }
    // }),

    Credentials({
      name: 'Custom Login',
      credentials: {
        name: { label: 'Nombre:', type: 'text', placeholder: 'nombre'  },
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
        
      },
      async authorize(credentials) {
        // console.log({credentials});
        // return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };

        // return await checkUserEmailPassword( credentials!.email, credentials!.password );
      return {name:credentials?.name, email:credentials?.email, id: ''}
        // return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };

      }
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
    


    


  ],

  // Custom Pages
  pages: {
    signIn: '/auth/login',
    // newUser: '/auth/register'
  },

  // Callbacks
  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // deprecated
  },
  
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },


  callbacks: {

    async jwt({ token, account, user }) {
      // console.log({ token, account, user });

      if ( account ) {
        token.accessToken = account.access_token;

        switch( account.type ) {

          case 'oauth': 
            token.user = user;
          break;

          case 'credentials':
            token.user = user;
          break;
        }

      }

      return token;
    },


    async session({ session, token, user }){
      // console.log({ session, token, user });

      (session as any).accessToken = token.accessToken;
      session.user = token.user as any;


      return session;
    }
    

  }

});