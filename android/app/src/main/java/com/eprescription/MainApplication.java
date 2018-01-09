package com.eprescription;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cmcewen.blurview.BlurViewPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.reactnativenavigation.NavigationApplication;

public class MainApplication extends NavigationApplication {

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            // eg. new VectorIconsPackage()
            new BlurViewPackage(),
            new RCTCameraPackage(),
            new VectorIconsPackage(),
            new ReactNativePushNotificationPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}

// public class MainApplication extends Application implements ReactApplication {
//
//   private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
//
//     @Override
//     public boolean getUseDeveloperSupport() {
//       return BuildConfig.DEBUG;
//     }
//
//     @Override
//     protected List<ReactPackage> getPackages() {
//       return Arrays.<ReactPackage>asList(
//           // new MainReactPackage(),
            // new BlurViewPackage(),
            // new RCTCameraPackage(),
            // new VectorIconsPackage(),
            // new ReactNativePushNotificationPackage()
//       );
//     }
//
//     // @Override
//     public boolean isDebug() {
//         // Make sure you are using BuildConfig from your own application
//         return BuildConfig.DEBUG;
//     }
//
//     // @Override
//     public List<ReactPackage> createAdditionalReactPackages() {
//         return getPackages();
//     }
//
//     @Override
//     protected String getJSMainModuleName() {
//       return "index";
//     }
//   };
//
//   @Override
//   public ReactNativeHost getReactNativeHost() {
//     return mReactNativeHost;
//   }
//
//   @Override
//   public void onCreate() {
//     super.onCreate();
//     SoLoader.init(this, /* native exopackage */ false);
//   }
// }
