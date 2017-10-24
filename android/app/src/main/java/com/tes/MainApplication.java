package com.tes;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import java.util.Arrays;
import java.util.List;
import com.rnfs.RNFSPackage;
import com.filepicker.FilePickerPackage;
import com.keyee.pdfview.PDFView;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new PDFView(),
          new MainReactPackage(),
          new PickerPackage(),
          new ImagePickerPackage(),
          new RNFSPackage(),
          new FilePickerPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
