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
        <Header title="How it works " />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`flex-1`}>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 10,
              }}>
              <View style={{marginBottom: 20}}>
                <Text
                  style={{fontSize: 14, color: color.black, fontWeight: '400'}}>
                  <Text
                    style={{
                      fontSize: 16,

                      color: color.black,
                      fontWeight: 'bold',
                    }}>
                    Mobilez Market{' '}
                  </Text>
                  is pleased to introduce a new opportunity for our valued users
                  to earn{' '}
                  <Text
                    style={{
                      fontSize: 14,

                      color: color.black,
                      fontWeight: 'bold',
                    }}>
                    PKR 10,000{' '}
                  </Text>{' '}
                  in a month through our Ad Posting Incentive Program. This
                  program is designed to reward active and committed users who
                  post advertisements on our web portal consistently. To
                  participate and earn{' '}
                  <Text
                    style={{
                      fontSize: 14,

                      color: color.black,
                      fontWeight: 'bold',
                    }}>
                    PKR 10,000,{' '}
                  </Text>{' '}
                  users must adhere to the following policy guidelines.
                </Text>
              </View>

              <Text style={styles.textHeading}>Eligibility Criteria:</Text>

              <Text style={styles.bulletPoint}>
                • To be eligible for the Mobilez Market Ad Posting Incentive
                Program, users must have a registered account on our web portal.
              </Text>
              <Text style={styles.bulletPoint}>
                • Users must be at least 18 years of age or older.
              </Text>

              <Text style={styles.textHeading}>Program Details:</Text>
              <Text style={styles.bulletPoint}>
                • Participants must post a minimum of 3 ads on the Mobilez
                Market web portal from a single user account in a single day
                consecutively for 30 days.
              </Text>
              <Text style={styles.bulletPoint}>
                • A total of 90 advertisements must be posted within the 30-day
                time frame to qualify for the incentive.
              </Text>
              <Text style={styles.bulletPoint}>
                • Each ad posted must comply with Mobilez Market's Terms of Use
                and must be relevant to the categories available on the portal.
              </Text>

              <Text style={styles.textHeading}>Incentive Reward:</Text>
              <Text style={styles.bulletPoint}>
                • Users who successfully post 90 advertisements within the
                30-day period will be eligible to earn PKR 10,000.
              </Text>
              <Text style={styles.bulletPoint}>
                • The PKR 10,000 reward will be credited to the user's Mobilez
                Market account within 7 business days after the completion of
                the 30-day period.
              </Text>
              <Text style={styles.bulletPoint}>
                • The reward can be withdrawn as cash or utilized for making
                purchases on Mobilez Market.
              </Text>

              <Text style={styles.textHeading}>Guidelines:</Text>
              <Text style={styles.bulletPoint}>
                • Participants must not engage in fraudulent or deceptive
                activities, including posting irrelevant or misleading ads, to
                qualify for the incentive. Such actions may result in
                disqualification from the program.
              </Text>
              <Text style={styles.bulletPoint}>
                • Participants must maintain the quality of their ads, including
                accurate descriptions and clear images, as per Mobilez Market's
                guidelines.
              </Text>
              <Text style={styles.bulletPoint}>
                • Mobilez Market reserves the right to monitor and verify ad
                postings for compliance with the program's rules.
              </Text>
              <Text style={styles.bulletPoint}>
                • In the event of any disputes or concerns, Mobilez Market's
                decision will be final.
              </Text>

              <Text style={styles.textHeading}>Program Duration:</Text>
              <Text style={styles.bulletPoint}>
                The Mobilez Market Ad Posting Incentive Program is an ongoing
                initiative with no set end date. However, participants must
                adhere to the 30-day consecutive ad posting requirement to
                qualify for the incentive.
              </Text>

              <Text style={styles.textHeading}>Conclusion:</Text>
              <Text style={styles.bulletPoint}>
                • Mobilez Market is excited to offer this opportunity for our
                users to earn PKR 10,000 by actively participating in our Ad
                Posting Incentive Program. We encourage all eligible users to
                engage with our platform, follow the guidelines, and make the
                most of this rewarding opportunity.
              </Text>
              <Text style={styles.bulletPoint}>
                • Mobilez Market reserves the right to modify or terminate this
                program at any time, with prior notice to participants. Any
                changes to the program will be communicated through our website
                and user notifications.
              </Text>

              <Text style={styles.textHeading}>
                Questions Regarding This Statement and Your Information
              </Text>
              <Text style={styles.bulletPoint}>
                If you have any questions or comments regarding this Statement
                or your information, please contact us at info@mobilezmarket.com
              </Text>

              <Text style={styles.textHeading}>How to Complain</Text>
              <Text style={styles.bulletPoint}>
                Please let us know if you are unhappy with how we have used your
                data or are not satisfied with our handling of any request by
                you with your rights. You can contact us using the contact
                details above. You also have the right to complain to the
                relevant supervisory authority.
              </Text>
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
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 13,
    color: 'black',
    fontWeight: '400',
  },
  textHeading: {
    fontWeight: '500',
    textDecorationLine: 'underline',
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    marginBottom: 5,
  },
});
