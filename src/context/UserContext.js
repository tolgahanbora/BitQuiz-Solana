import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productIds, setProductIds] = useState();

  const broadcastUser = async () => {
    try {
      const channels = supabase.channel('custom-all-channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'profiles' },
          (payload) => {
            setUser(payload.new.data);
          }
        )
        .subscribe();
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const getProductIds = async () => {
    try {
      console.log("deneme");
      const offerings = await Purchases.getOfferings();
  
      if (offerings.current && offerings.current.availablePackages) {
        setProductIds(offerings.current.availablePackages);
        console.log("product:",offerings.current.availablePackages )
      } else {
        console.log("product not found");
      }
    } catch (e) {
      console.log("error message", e.message);
    }
  };

  const updateCustomerInformation = async (customerInfo) => {
    console.log("customer sold", customerInfo)
  }

  useEffect(() => {
    broadcastUser();

    // Purchases ile ilgili işlemleri burada gerçekleştirebilirsiniz.
    // Eğer Purchases ile ilgili bir context değeri kullanacaksanız,
    // burada context'i güncellemelisiniz.

    Purchases.setLogLevel(LOG_LEVEL.DEBUG);

    if (Platform.OS === 'android') {
      Purchases.configure({
        apiKey: "goog_KDEMFRhRoqKUqgXnbhUAjjgwOOD",
        appUserID: "app3b3a0eb092",
        observerMode: false,
        useAmazon: false
      });
    }

    Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    Purchases.addCustomerInfoUpdateListener((customerInfo) => {
      console.log("customer info", customerInfo);
      // Eğer bir context değeri kullanacaksanız, burada context'i güncelleyebilirsiniz.
      // Örneğin: setUser(customerInfo);
    });

    // getProductIds fonksiyonunu çağırabilirsiniz.
     getProductIds();

    return () => {
      // Component unmount edildiğinde aboneliği kapat
      supabase.removeSubscription();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, productIds }}>
      {children}
    </UserContext.Provider>
  );
};
