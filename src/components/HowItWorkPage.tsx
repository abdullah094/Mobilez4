import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import {color} from '../constants/Colors';
import Header from './Header';

const HowItWorkPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`flex-1`}>
            <Header title="How it works " />
            <View>
              <View
                style={{
                  // alignItems: 'center',
                  padding: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
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
                  padding: 10,
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{fontSize: 18, color: color.black, fontWeight: '500'}}>
                  Updating Information
                </Text>
                <Text
                  style={{
                    // padding: 10,
                    marginTop: 10,
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
                  padding: 10,
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{fontSize: 18, color: color.black, fontWeight: '500'}}>
                  Modifications to Privacy Notice
                </Text>
                <Text
                  style={{
                    marginTop: 10,
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
                    paddingHorizontal: 20,
                  }}>
                  Questions Regarding This Statement and Your Information
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    color: 'black',
                    paddingHorizontal: 20,
                  }}>
                  If you have any questions or comments regarding this Statement
                  or your information, please contact us at
                  info@mobilezmarket.com
                </Text>
              </View>
              <View
                style={{
                  padding: 10,
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{fontSize: 18, color: color.black, fontWeight: '500'}}>
                  How to Complain
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    color: 'black',
                    marginTop: 10,
                  }}>
                  Please let us know if you are unhappy with how we have used
                  your data or are not satisfied with our handling of any
                  request by you with your rights. You can contact us using the
                  contact details above. You also have the right to complain to
                  the relevant supervisory authority.
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 20,
                marginBottom: 20,
              }}>
              {/* <Button
                onPress={() => {
                  navigation.navigate('ProgressBarComponent');
                }}
                style={{borderRadius: 10}}
                mode="contained"
                buttonColor="#015dcf">
                I Accept the terms and conditions
              </Button> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HowItWorkPage;
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
