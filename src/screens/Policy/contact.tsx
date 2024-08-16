import { SafeAreaView, ScrollView, useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";

export const Contact = () => {
  const width = useWindowDimensions().width;
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RenderHTML
          contentWidth={width}
          source={{
            html: '<h2>Open New AI Legalities.</h2><p>This page outlines the legal terms and conditions for using Open News AI. By using the app, you agree to these terms and conditions.</p><h2>Terms and Conditions.&nbsp;</h2><p>The following terms and conditions govern your use of the social media app:</p><ul><li>You must be at least 13 years old to use the app.</li><li>You must not use the app for any illegal or unauthorised purposes.</li><li>You must not upload or post any content that is offensive, harmful, threatening, abusive, defamatory, vulgar, obscene, pornographic, or otherwise objectionable material.</li><li>You must not upload or post any content that infringes on the intellectual property rights of others.</li><li>You must not upload or post any viruses, malware, or other malicious code.</li><li>You must not impersonate any person or entity.</li><li>You must not engage in spamming or other unethical or illegal marketing practices.</li></ul><h2>Privacy Policy</h2><p>Our privacy policy outlines how we collect, use, and protect your personal&nbsp;</p><ul><li>We collect information that you voluntarily provide to us, such as your name and email address.</li><li>We use your information to provide you with a better user experience and to improve our app.</li><li>We do not sell or rent your information to third parties.</li><li>We take reasonable steps to protect your information from unauthorised access, use, or disclosure.</li><li>By using the app, you consent to our privacy policy.</li></ul><h2>Disclaimer</h2><p>Open News AI is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, as to the operation of the app or the information, content, materials, or products included on the app.</p><p>To the fullest extent permitted by law, we disclaim all warranties, express or implied, including but not limited to, implied warranties of merchant ability and fitness for a particular purpose.</p>',
          }}
          defaultTextProps={{
            selectable: true,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
