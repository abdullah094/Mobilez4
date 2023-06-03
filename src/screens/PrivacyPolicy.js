import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color} from '../constants/Colors';
import {ScrollView, Dimensions} from 'react-native';

const PrivacyPolicy = () => {
  const {width, height} = Dimensions.get('window');

  return (
    <ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            justifyContent: 'flex-start',
            fontSize: 20,
            fontWeight: '700',
            color: 'black',
            flexDirection: 'row',
            width: width,
            padding: 8,
          }}>
          Privacy Policy :
        </Text>
        <Text style={{padding: 10, fontWeight: '400', color: 'black'}}>
          We may handle your data in connection with your use of the Platform.
          This privacy notice (together with our Terms and Conditions) set out,
          for the Platform, our collection and sharing practices, the uses to
          which personal data is put, how we protect it following the data
          protection laws, and your privacy rights. Please read it carefully.
          This Statement applies to Personal Data processed by Mobilez Market
          when you: Visit this website (www.mobilezmarket.com ) and/or any other
          Mobilez Market website(s) that reference or link to this Statement
          (collectively, “Website”). Use, download, and access, as applicable,
          any of our various internet-based offerings, including mobile
          platforms, software, or applications (collectively, “Services”). Visit
          Mobilez Market’s branded social media sites. Receive communications
          from us, including emails, phone calls, or other electronic messages;
          or Data we collect. We collect some information directly from you (for
          example, via forms you complete or products or Services you access,
          download, or otherwise obtain). Such information is generally limited
          to: Name, Contact details, Email ID, IMEI, and Device Details. Your
          communications with Mobilez Market personnel. The content you post on
          our social media sites. Information you provide on the Website, such
          as online questionnaires, or feedback forms. Information you provide
          when you subscribe to sms services. Information you provide when you
          create your account, log-in credentials, and information about your
          use of and preferences for the Services. Other information is received
          indirectly from you via the use of the Services (for example, from
          observing your actions on the Website or providing you with account
          access). Such information is generally limited to: Information
          regarding usage of the Services or Website via weblogs is collected
          automatically and passively using various technologies, which
          generally will not specifically identify you or other individuals.
          Examples may include IP addresses, Device details, browser types,
          domain names, and other anonymous statistical data regarding aggregate
          usage. Lastly, we also collect Personal Data via other sources such as
          public records, publicly available sources or internet sites, vendors,
          data suppliers, service providers, commercially available marketing
          lists or registries, telephone directories, social networks (such as
          LinkedIn), news outlets, and related media. Such Personal Data
          collected via these sources is limited to business contact
          information, such as names, contact information, job titles, IP
          addresses, and LinkedIn and other social media profiles. Use Of
          Personal Data Mobilez Market uses your Personal Data when: it is
          necessary to perform our obligations or exercise our contractual
          rights; we have a legitimate business interest to process such
          Personal Data; it is necessary to comply with applicable laws or
          regulations; we have your consent (where required under applicable
          law) to use your information (where we rely on your consent, you have
          the right to withdraw consent by contacting us as set forth below).
          Rights And Obligations Concerning Your Data You have many rights under
          data protection laws about the way we process your data. These are set
          out below. You may contact us using the details in section 14 below to
          exercise any of these rights. We will respond to any request received
          from you within one month from the date of the request. DESCRIPTION OF
          RIGHTS Right 1 – A right to access personal data held by us about you.
          Right 2 – A right to require us to rectify any inaccurate personal
          data held by us about you. Right 3 – A right to require us to erase
          personal data held by us about you. This right will only apply where
          (for example): we no longer need to use the personal data to achieve
          the purpose we collected it for, where you withdraw your consent (if
          we are using your data based on your consent); or where you object to
          the way we process your data (in line with Right 6 below). Right 4 – A
          right to restrict our processing of personal data held by us about
          you. This right will only apply where (for example): you dispute the
          accuracy of the personal data held by us; where you would have the
          right to require us to erase the personal data but would prefer that
          our processing is restricted instead; or where we no longer need to
          use the personal data to achieve the purpose we collected it for, but
          you require the data for dealing with legal claims. Right 5 – A right
          to receive personal data, which you have provided to us, in a
          structured, commonly used, and machine-readable format. You also have
          the right to require us to transfer this personal data to another
          organization, at your request. Right 6 – A right to object to our
          processing of your data (including sending promotional messages to
          you). Right 7 – A right to withdraw your consent, where we are relying
          on it to use your data (for example, to provide you with promotional
          messages about our services or products). If you withdraw your
          consent, we may not be able to provide certain products or services to
          you. These rights are subject to certain exemptions to safeguard the
          public interest (e.g. the prevention or detection of crime) and our
          interests (e.g. the maintenance of legal privilege). Updating
          Information Keeping your information accurate and up to date is very
          important. Inaccurate or incomplete information could impair our
          ability to deliver relevant services to you. We will use reasonable
          endeavors to ensure that your data is accurate. To assist us with
          this, you should notify us of any changes to your data by updating
          your profile on the Platform (App) or by contacting us as set out in
          section 14 below. Intentionally providing false or misleading
          information or using another person’s email address or personal data
          to falsely obtain any products or services through the Platform, may
          lead to termination of access to the Platform and may result in legal
          action. Modifications to Privacy Notice We may change the content of
          the Platform and how we use cookies and consequently, this privacy
          notice and our cookies notice, and any other document to which they
          refer are subject to change at any time. If we make material updates
          to this privacy notice, we will update the date it was last changed
          and will indicate it in the document. Any changes we make to this
          privacy notice become effective immediately when we post the revised
          privacy notice on the Platform. We recommend that you review this
          privacy notice regularly for changes. Questions Regarding This
          Statement and Your Information If you have any questions or comments
          regarding this Statement or your information, please contact us at
          info@mobilezmarket.com How to Complain Please let us know if you are
          unhappy with how we have used your data or are not satisfied with our
          handling of any request by you with your rights. You can contact us
          using the contact details above. You also have the right to complain
          to the relevant supervisory authority.
        </Text>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
