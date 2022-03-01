import shajs from 'sha.js'
import { createContext, useContext, useEffect, useState } from "react";
import { useCustomWallet } from '../WalletContext';
import { useGlobal } from '../GlobalContext';
import useToast from "../../hooks/useToast";

export const UserRole = {
  Admin: 'admin',
  User: 'user',
  Creator: 'creator'
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({
    loggedEmailName: '',
    loggedUserName: '',
    loggedUserRole: '',
    loggedPassword: '',
    isLoggedIn: false,
    avatarURI: '',
    coverURI: '',
    businessName: '',
    bio: '',
    notification: '{}'
  })

  const [creatorSignupInfo, setCreatorSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
    projectName: '',
    projectDescription: '',
    category: '',
    tags: '',
  });

  const { wallet, getWalletAddressBySessionKey } = useCustomWallet();
  const { global, invokeServer } = useGlobal();
  const { toastInfo, toastError, toastSuccess, showLoading, hideLoading } = useToast();

  const handleLoggedUser = (user) => {
    setAuth(u => {
      return {
        ...u,
        loggedEmailName: user.loggedEmailName,
        loggedUserName: user.loggedUserName,
        loggedUserRole: user.loggedUserRole,
        loggedPassword: user.loggedPassword,
        isLoggedIn: user.isLoggedIn,
        avatarURI: user.avatar || '',
        coverURI: user.cover || '',
        businessName: user.businessName || '',
        bio: user.bio || '',
        notification: user.notification || '{}'
      }
    })
  }

  const handleSignIn = (user, password) => {
    if (auth.isLoggedIn) {
      return;
    }

    password = shajs('sha384').update(password).digest('hex');

    // console.log("handleSignIn: user=%s, password=%s", user, password);

    var tdata = {
      name: user,
      password: password,
      address: wallet.address
    }

    invokeServer('post', '/api/signin/', tdata)
      .then(response => {

        console.log("signin response: ", response.data);

        if (response.data.result == 1) {
          window.localStorage.setItem(global.sessionKey, JSON.stringify({
            email: response.data.info.email,
            name: response.data.info.name,
            password: password,
            address: wallet.address,
            role: response.data.role,
            avatar: response.data.info.avatarURI,
            cover: response.data.info.coverURI,
            businessName: response.data.info.businessName,
            bio: response.data.info.bio,
            notification: response.data.info.notification || '{}',
          }));

          handleLoggedUser({
            loggedEmailName: response.data.info.email,
            loggedUserName: response.data.info.name,
            loggedUserRole: response.data.role, // Assume if user is a seller
            loggedPassword: password,
            isLoggedIn: true,
            avatar: response.data.info.avatarURI,
            cover: response.data.info.coverURI,
            businessName: response.data.info.businessName,
            bio: response.data.info.bio,
            notification: response.data.info.notification || '{}',
          });

          toastInfo(user, response.data.msg);
        } else {
          toastError(user, response.data.msg);
        }
      }).catch(err => {
        toastError(user, err.toString());
      })
  }

  const handleSignUp = (email, user, password) => {
    // sign-up check here.

    password = shajs('sha384').update(password).digest('hex');
    // console.log("email=%s, user=%s, password=%s", email, user, password);

    var tdata = {
      email: email,
      name: user,
      password: password,
      address: wallet.address
    }

    invokeServer('post', '/api/signup/', tdata)
      .then(response => {
        if (response.data.result == 1) {
          window.localStorage.setItem(global.sessionKey, JSON.stringify({
            email: response.data.info.email,
            name: user,
            password: password,
            address: wallet.address,
            role: response.data.role,
            avatar: '',
            cover: '',
            notification: '{}'
          }));

          handleLoggedUser({
            loggedEmailName: response.data.info.email,
            loggedUserName: response.data.info.name,
            loggedUserRole: response.data.role,
            loggedPassword: password,
            isLoggedIn: true
          });

          toastSuccess(user, response.data.msg);
        } else {
          toastError(user, response.data.msg);
        }
      })
      .catch(err => {
        console.log(user, `sign-up failed ${err.toString()}`);
        toastError(user, err.message);
      })
  }

  const handleLogOut = () => {
    var tdata = window.localStorage.getItem(global.sessionKey);
    window.localStorage.removeItem(global.sessionKey);

    let userName = auth.loggedUserName;

    handleLoggedUser({
      loggedEmailName: '',
      loggedUserName: '',
      loggedUserRole: '',
      loggedPassword: '',
      isLoggedIn: false,
      avatar: '',
      cover: '',
      notification: '{}'
    });

    invokeServer('post', '/api/signout/', JSON.parse(tdata))
      .then(response => {
        toastInfo(userName, 'signed out');
      })
      .catch(err => {
        toastError('unexpected:', err.toString());
      })
      .finally(() => {
      })
  }

  const handleSubmitCreatorInfo = () => {
    let pwd = shajs('sha384').update(creatorSignupInfo.password).digest('hex');

    showLoading('Requesting to sign-up as a creator...');

    invokeServer('post', '/api/signup/creator', {
      address: wallet.address?.toLowerCase(),
      name: creatorSignupInfo.name,
      email: creatorSignupInfo.email,
      password: pwd,
      projectName: creatorSignupInfo.projectName,
      projectDescription: creatorSignupInfo.projectDescription,
      category: creatorSignupInfo.category,
      tags: creatorSignupInfo.tags,
    })
      .then(response => {
        hideLoading();

        if (response.data.result == 1) {
          toastSuccess('Sign-up As a Creator', response.data.msg);
        } else {
          toastError('Sign-up As a Creator', response.data.msg);
        }
      })
      .catch(err => {
        hideLoading();
        toastError('Sign-up As a Creator', `${err.message}`);
        console.log(err.message);
      })
  }

  const updateSessionProfile = (t) => {
    if (!auth.isLoggedIn) return;

    let tdata = JSON.parse(window.localStorage.getItem(global.sessionKey));
    window.localStorage.setItem(global.sessionKey, JSON.stringify({ ...tdata, ...t }));

    t.avatar && setAuth(t => { return {...t, avatarURI: t.avatar}});
    t.cover && setAuth(t => { return {...t, coverURI: t.cover}});
    t.bio && setAuth(t => { return {...t, bio: t.bio}});
    t.businessName && setAuth(t => { return {...t, businessName: t.businessName}});
  }

  useEffect(() => {
    var strVal = window.localStorage.getItem(global.sessionKey);
    let wval = getWalletAddressBySessionKey();

    if (strVal !== null && strVal != '') {
      var tt = JSON.parse(strVal);

      if (tt.address !== wval) {
        handleLogOut();
      } else {
        if (!auth.isLoggedIn) {
          handleLoggedUser({
            loggedEmailName: tt.email,
            loggedUserName: tt.name,
            loggedUserRole: tt.role, // Assume if user is a seller
            loggedPassword: tt.password,
            isLoggedIn: true,
            avatar: tt.avatar,
            cover: tt.cover,
            businessName: tt.businessName,
            bio: tt.bio,
            notification: tt.notification
          });
        }
      }
    }
  })

  return (
    <AuthContext.Provider value={{ auth, setAuth, handleSignIn, handleLogOut, handleSignUp, creatorSignupInfo, setCreatorSignupInfo, handleSubmitCreatorInfo, updateSessionProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to get and update configs state
 */
export const useAuth = () => {
  const authManager = useContext(AuthContext)
  return authManager || [{}, async () => { }]
}
