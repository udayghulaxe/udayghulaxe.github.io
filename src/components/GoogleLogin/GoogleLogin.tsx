import React, { useState, useRef, useEffect, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { signInAction, signOutAction } from "../../store/authSlice";
import { Constants } from "../../globals";
import './GoogleLogin.scss';

const GoogleLogin = () => {
  const auth = useRef<any>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    loadGoogleAPIScript();
  }, []);

  /**
   * Initial load of google api
   */
  const loadGoogleAPIScript = () => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
          scope: Constants.GOOGLE_SCOPE,
          discoveryDocs: [
            Constants.GOOGLE_DISCOVERY_DOCS,
          ],
        })
        .then(() => {
          auth.current = gapi.auth2.getAuthInstance();
          onAuthChange(auth.current.isSignedIn.get());
          // listen for auth changes in future
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  };

  /**
   * Auto trigger function on auth status change
   * @param isSignedInStatus: Boolean
   */
  const onAuthChange = (isSignedInStatus: boolean) => {
    if (isSignedInStatus) {
      setIsSignedIn(isSignedInStatus);
      const currentUser = auth.current.currentUser.get();
      dispatch(
        signInAction({
          userId: currentUser.uid,
          name: currentUser.getBasicProfile().getName(),
          email: currentUser.getBasicProfile().getEmail(),
        })
      );
      
    } else {
      setIsSignedIn(isSignedInStatus);
      dispatch(signOutAction());
      
    }
  };

  /**
   * On click of google signIn button
   */
  const onSignInClick = (): void => {
    auth.current.signIn().then(() => {
      const currentUser = auth.current.currentUser.get();
      localStorage.setItem("token", currentUser.getAuthResponse().id_token);
      navigate(`/calendar`);
    });
  };

  /**
   * On click of google signoOut button
   */
  const onSignOutClick = (): void => {
    auth.current.signOut().then(() => {
      localStorage.removeItem("token");
      navigate(`/`);
    });
  };

  /**
   * Render sign in/out button based on condition
   * @returns JSXElement
   */
  const renderAuthButton = (): ReactElement => {
    return !isSignedIn ? (
      <button className="google-login__button rounded-md" onClick={onSignInClick}>
        <img className="google-login__icon" src="/assets/icons/google.jpg" alt="Uday Ghulaxe" />
          Google Login
        </button>
    ) : (
      <button className="google-login__button rounded-md" onClick={onSignOutClick}>Logout</button>
    );
  };

  return renderAuthButton();
};

export default GoogleLogin;
