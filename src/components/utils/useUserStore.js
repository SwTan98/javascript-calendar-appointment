/**
 * auth functions referred from aws lab training
 */

import { onBeforeMount, ref } from "vue";
import { defineStore } from "pinia";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../auth/UserPool";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const error = ref(undefined);

  const setIsLoggedIn = (value) => {
    isLoggedIn.value = value;
  };

  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();

      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject(err);
          } else {
            const attributes = await new Promise((attrResolve) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  const results = {};

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }
                  attrResolve(results);
                }
              });
            });

            const token = session.getIdToken().getJwtToken();
            resolve({
              user,
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
              ...session,
              ...attributes,
            });
          }
        });
      } else {
        reject();
      }
    });

  const authenticate = async (Username, Password) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          resolve(data);
          setIsLoggedIn(true);
        },

        onFailure: (err) => {
          error.value = err;
          reject(err);
        },

        /**
         * bypass cognito change password policy
         * TODO: create change password UI for first login
         */
        newPasswordRequired: (data) => {
          error.value = "New Password Required";
          user.completeNewPasswordChallenge(Password);
          resolve(data);
        },
      });
    });

  const handleLogout = () => {
    const user = Pool.getCurrentUser();
    if (user) user.signOut();
    setIsLoggedIn(false);
  };

  const checkIsLoggedIn = async () => {
    let currentLoggedIn = false;
    try {
      const response = await getSession();
      if (response) {
        currentLoggedIn = true;
      }
    } catch (e) {
      if (e?.message) {
        console.error(e.message);
      }
    }
    setIsLoggedIn(currentLoggedIn);
    return currentLoggedIn;
  };

  // fetch user detail on first load
  onBeforeMount(checkIsLoggedIn);

  return {
    isLoggedIn,
    setIsLoggedIn,
    checkIsLoggedIn,
    handleLogout,
    getSession,
    authenticate,
  };
});
