import { SafeAreaView, ScrollView, useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";

export const Terms = () => {
  const width = useWindowDimensions().width;
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RenderHTML
          contentWidth={width}
          source={{
            html: `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Terms & Conditions - Open News AI</title>
            </head>
            <body>
                <header>
                    <h1>Terms & Conditions</h1>
                    <p>Last Updated: 09-15-2023</p>
                </header>
            
                <section>
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing or using the services provided by Open News AI, you agree to comply with and be bound by these Terms & Conditions.</p>
                </section>
            
                <section>
                    <h2>2. Use of Services</h2>
                    <p>You agree to use the services provided by Open News AI only for lawful purposes and in accordance with these Terms & Conditions.</p>
                </section>
            
                <section>
                    <h2>3. Intellectual Property</h2>
                    <p>Open News AI and its content, including but not limited to text, graphics, logos, and software, are protected by intellectual property laws. You may not use, reproduce, or distribute our content without permission.</p>
                </section>
            
                <section>
                    <h2>4. User Accounts</h2>
                    <p>If you create an account with Open News AI, you are responsible for maintaining the confidentiality of your account information and agree to notify us of any unauthorized access or use of your account.</p>
                </section>
            
                <section>
                    <h2>5. Privacy</h2>
                    <p>Your use of our services is also governed by our Privacy Policy, which can be found [link to Privacy Policy].</p>
                </section>
            
                <section>
                    <h2>6. Limitation of Liability</h2>
                    <p>Open News AI is not liable for any damages or losses incurred as a result of using our services. We do not guarantee the accuracy or availability of our content.</p>
                </section>
            
                <section>
                    <h2>7. Changes to Terms & Conditions</h2>
                    <p>We may update these Terms & Conditions as needed. The latest version will be posted on our website with a revised "Last Updated" date.</p>
                </section>
            
                <section>
                    <h2>8. Contact Us</h2>
                    <p>If you have any questions or concerns about these Terms & Conditions, please contact us at services@opennewsai.com.</p>
                </section>
            
                <footer>
                    <p>Copyright © 2023 Open News AI. All rights reserved.</p>
                </footer>
            </body>
            </html>`,
          }}
          defaultTextProps={{
            selectable: true,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
