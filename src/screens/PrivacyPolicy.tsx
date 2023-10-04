import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import tw from 'twrnc';
import Header from '../components/Header';
import {color} from '../constants/Colors';

const PrivacyPolicy = () => {
  const {width, height} = Dimensions.get('window');

  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header title="Privacy And Policy" />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                Privacy Policy We may handle your data in connection with your
                use of the Platform. This privacy notice together with our Terms
                and Conditions set out, for the Platform, our collection and
                sharing practices, the uses to which personal data is put, how
                we protect it following the data protection laws, and your
                privacy rights. Please read it carefully.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                  marginTop: 5,
                }}>
                This Statement applies to Personal Data processed by Mobilez
                Market when you:
              </Text>

              <View>
                <Text style={styles.bulletPoint}>
                  • Visit this website (www.mobilezmarket.com) and/or any other
                  Mobilez Market websites that reference or link to this
                  Statement collectively, "Website
                </Text>
                <Text style={styles.bulletPoint}>
                  • Use, download, and access, as applicable, any of our various
                  internet-based offerings, including mobile platforms,
                  software, or applications collectively, "Services".
                </Text>
                <Text style={styles.bulletPoint}>
                  • Visit Mobilez Market's branded social media sites.
                </Text>
                <Text style={styles.bulletPoint}>
                  • Receive communications from us, including emails, phone
                  calls, or other electronic messages; or Data we collect.
                </Text>
                <Text style={styles.bulletPoint}>
                  • We collect some information directly from you for example,
                  via forms you complete or products or Services you access,
                  download, or otherwise obtain. Such information is generally
                  limited to: Name, Contact details, Email ID, IMEI, and Device
                  Details.
                </Text>
                <Text style={styles.bulletPoint}>
                  • Your communications with Mobilez Market personnel.
                </Text>
                <Text style={styles.bulletPoint}>
                  • The content you post on our social media sites.
                </Text>
                <Text style={styles.bulletPoint}>
                  • Information you provide on the Website, such as online
                  questionnaires or feedback forms.
                </Text>
                <Text style={styles.bulletPoint}>
                  • Information you provide when you subscribe to SMS services.
                </Text>
                <Text style={styles.bulletPoint}>
                  • Information you provide when you create your account, log-in
                  credentials, and information about your use of and preferences
                  for the Services.
                </Text>
                <Text style={styles.bulletPoint}>
                  • Other information is received indirectly from you via the
                  use of the Services for example, from observing your actions
                  on the Website or providing you with account access.
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.textHeading}>
                Such information is generally limited to
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                Information regarding usage of the Services or Website via
                weblogs is collected automatically and passively using various
                technologies, which generally will not specifically identify you
                or other individuals. Examples may include IP addresses, Device
                details, browser types, domain names, and other anonymous
                statistical data regarding aggregate usage.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                Lastly, we also collect Personal Data via other sources such as
                public records, publicly available sources or internet sites,
                vendors, data suppliers, service providers, commercially
                available marketing lists or registries, telephone directories,
                social networks (such as LinkedIn), news outlets, and related
                media. Such Personal Data collected via these sources is limited
                to business contact information, such as names, contact
                information, job titles, IP addresses, and LinkedIn and other
                social media profiles.
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={styles.textHeading}>Use Of Personal Data</Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                Mobilez Market uses your Personal Data when: it is necessary to
                perform our obligations or exercise our contractual rights; we
                have a legitimate business interest to process such Personal
                Data; it is necessary to comply with applicable laws or
                regulations; we have your consent where required under
                applicable law to use your information where we rely on your
                consent, you have the right to withdraw consent by contacting us
                as set forth below.
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={styles.textHeading}>
                Rights And Obligations Concerning Your Data
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                You have many rights under data protection laws about the way we
                process your data. These are set out below. You may contact us
                using the details in section 14 below to exercise any of these
                rights. We will respond to any request received from you within
                one month from the date of the request.
              </Text>
            </View>
            <View>
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <Text
                  style={{fontSize: 18, color: color.black, fontWeight: '500'}}>
                  Description of the Rights
                </Text>
              </View>

              <Text style={styles.bulletPoint}>
                • Right 1 – A right to access personal data held by us about
                you.
              </Text>
              <Text style={styles.bulletPoint}>
                • Right 2 – A right to require us to rectify any inaccurate
                personal data held by us about you
              </Text>
              <Text style={styles.bulletPoint}>
                • Right 3 – A right to require us to erase personal data held by
                us about you. This right will only apply where for example: we
                no longer need to use the personal data to achieve the purpose
                we collected it for, where you withdraw your consent if we are
                using your data based on your consent; or where you object to
                the way we process your data in line with Right 6 below.
              </Text>
              <Text style={styles.bulletPoint}>
                • Right 4 – A right to restrict our processing of personal data
                held by us about you. This right will only apply where for
                example: you dispute the accuracy of the personal data held by
                us; where you would have the right to require us to erase the
                personal data but would prefer that our processing is restricted
                instead; or where we no longer need to use the personal data to
                achieve the purpose we collected it for, but you require the
                data for dealing with legal claims
              </Text>
              <Text style={styles.bulletPoint}>
                • Right 5 – A right to receive personal data, which you have
                provided to us, in a structured, commonly used, and
                machine-readable format. You also have the right to require us
                to transfer this personal data to another organization, at your
                request.
              </Text>
              <Text style={styles.bulletPoint}>
                • Right 6 – A right to object to our processing of your data
                including sending promotional messages to you.
              </Text>
              <Text style={styles.bulletPoint}>
                • Right 7 – A right to withdraw your consent, where we are
                relying on it to use your data for example, to provide you with
                promotional messages about our services or products. If you
                withdraw your consent, we may not be able to provide certain
                products or services to you.
              </Text>
              {/* <View
            style={{
              alignItems: 'center',
              borderWidth: 1,
              width: width - 30,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                justifyContent: 'center',
                flexWrap: 'wrap',

                width: width,
              }}>
              These rights are subject to certain exemptions to safeguard the
              public interest e.g. the prevention or detection of crime and our
              interests e.g. the maintenance of legal privilege.
            </Text>
          </View> */}
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <Text
                  style={{fontSize: 18, color: color.black, fontWeight: '500'}}>
                  Updating Information
                </Text>
                <Text
                  style={{
                    padding: 10,
                    fontWeight: '400',
                    color: 'black',
                  }}>
                  Keeping your information accurate and up to date is very
                  important. Inaccurate or incomplete information could impair
                  our ability to deliver relevant services to you. We will use
                  reasonable endeavors to ensure that your data is accurate. To
                  assist us with this, you should notify us of any changes to
                  your data by updating your profile on the Platform (App) or by
                  contacting us as set out in section 14 below. Intentionally
                  providing false or misleading information or using another
                  person’s email address or personal data to falsely obtain any
                  products or services through the Platform, may lead to
                  termination of access to the Platform and may result in legal
                  action.
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 18, color: color.black, fontWeight: '500'}}>
                  Modifications to Privacy Notice
                </Text>
                <Text
                  style={{
                    padding: 10,
                    fontWeight: '400',
                    color: 'black',
                  }}>
                  We may change the content of the Platform and how we use
                  cookies and consequently, this privacy notice and our cookies
                  notice, and any other document to which they refer are subject
                  to change at any time. If we make material updates to this
                  privacy notice, we will update the date it was last changed
                  and will indicate it in the document. Any changes we make to
                  this privacy notice become effective immediately when we post
                  the revised privacy notice on the Platform. We recommend that
                  you review this privacy notice regularly for changes.
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: '400',
                    color: 'black',
                    paddingHorizontal: 10,
                  }}>
                  Questions Regarding This Statement and Your Information
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    color: 'black',
                    paddingHorizontal: 10,
                  }}>
                  If you have any questions or comments regarding this Statement
                  or your information, please contact us at
                  info@mobilezmarket.com
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <Text
                  style={{fontSize: 18, color: color.black, fontWeight: '500'}}>
                  How to Complain
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    color: 'black',
                    paddingHorizontal: 10,
                  }}>
                  Please let us know if you are unhappy with how we have used
                  your data or are not satisfied with our handling of any
                  request by you with your rights. You can contact us using the
                  contact details above. You also have the right to complain to
                  the relevant supervisory authority.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  bulletPoint: {
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 13,
    color: 'black',
    fontWeight: '400',
  },
  textHeading: {
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
});
