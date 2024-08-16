import { SafeAreaView, ScrollView, useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";

export const Policy = () => {
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
                <title>Privacy Policy - Open News AI</title>
            </head>
            <body>
                <header>
                    <h1>Privacy Policy</h1>
                    <p>Last Updated: 09-15-2023</p>
                </header>
            
                <section>
                    <h2>1. Introduction</h2>
                    <p>Welcome to Open News AI. This Privacy Policy is designed to help you understand how we collect, use, and safeguard your personal information. By using our services, you consent to the practices described in this policy.</p>
                </section>
            
                <section>
                    <h2>2. Information We Collect</h2>
                    <p>We may collect the following types of information when you use our website and services:</p>
                    <ul>
                        <li>Personal Information: Name ,Email and Profile Picture</li>
                        <li>Usage Information: IP address, browser type and search data</li>
                    </ul>
                </section>
            
                <section>
                    <h2>3. How We Use Your Information</h2>
                    <p>We may use your information for the following purposes:</p>
                    <ul>
                        <li>Provide and improve our services</li>
                        <li>Communicate with you</li>
                        <li>Protect against fraud and ensure the security of our website</li>
                    </ul>
                </section>
            
                <section>
                    <h2>4. Cookies and Similar Technologies</h2>
                    <p>We may use cookies and similar technologies to collect information and improve our services. You can manage your cookie preferences through your browser settings.</p>
                </section>
            
                <section>
                    <h2>5. Information Sharing</h2>
                    <p>We may share your information with third parties in the following circumstances:</p>
                    <ul>
                        <li>With your consent</li>
                        <li>For legal reasons</li>
                        <li>With service providers and partners</li>
                    </ul>
                </section>
            
                <section>
                    <h2>6. Your Choices</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access, correct, or delete your personal information</li>
                        <li>Opt out of marketing communications</li>
                    </ul>
                </section>
            
                <section>
                    <h2>7. Security</h2>
                    <p>We take measures to protect your information, but no data transmission over the internet is entirely secure.</p>
                </section>
            
                <section>
                    <h2>8. Changes to this Privacy Policy</h2>
                    <p>We may update this Privacy Policy as needed. The latest version will be posted on our website with a revised "Last Updated" date.</p>
                </section>
            
                <section>
                    <h2>9. Contact Us</h2>
                    <p>If you have any questions or concerns about this Privacy Policy, please contact us at services@opennewsai.com.</p>
                </section>
            
                <footer>
                    <p>Copyright © 2023 Open News AI. All rights reserved.</p>
                </footer>
            </body>
            </html>
            `,
          }}
          defaultTextProps={{
            selectable: true,
          }}
          enableExperimentalMarginCollapsing
        />
      </ScrollView>
    </SafeAreaView>
  );
};
