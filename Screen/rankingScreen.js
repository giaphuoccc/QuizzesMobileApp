import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from './UserContext';
import User from '../components/userCompo';
import { LOCALHOST } from '../config';


const RankingScreen = ({ navigation }) => {
    const { userId, users } = useContext(UserContext);
    const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    const [userFriends, setUserFriends] = useState([]);
    const [rankList, setRankList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);


    const resetAllUserStat = useCallback(async () => {
        try {
            const userResponse = await fetch(`${LOCALHOST}/users/resetUserPoint`, {
                method: 'PATCH',
            });
            if (!userResponse.ok) {
                throw new Error('Failed to reset user points');
            }
            const userData = await userResponse.json();
            console.log('User data:', userData);
        } catch (error) {
            console.log('Error message', error);
        }
    }, []);

    const fetchUserFriend = useCallback(async () => {
        try {

            const friendsResponse = await fetch(`${LOCALHOST}/users/friends/${userId}`);
            const friendsData = await friendsResponse.json();
            // console.log(users);
            // console.log(userId);
            const userResponse = await fetch(`${LOCALHOST}/users/main/${userId}`);
            const userData = await userResponse.json();
            let prepareList = []
            if (friendsResponse.ok && userResponse.ok) {
                if (friendsResponse.length >= 0) {
                    // console.log(friendsData)
                    prepareList.push(friendsData);
                }
                // console.log(userData)
                prepareList.push(userData);
                // setUserFriends(friendsData);
                setRankList(prepareList);
                setDataLoaded(true);
            } else {
                if (!friendsResponse.ok) {
                    console.log('Error retrieving user friends', friendsResponse.status);
                }
                if (!userResponse.ok) {
                    console.log('Error retrieving user ', userResponse.status);
                }
            }
        } catch (error) {
            console.log('Error message', error);
        }
    }, [userId]);

    useEffect(() => {
        fetchUserFriend();
        rankList.sort((a, b) => a.stats - b.stats)
    }, [fetchUserFriend]);

    useEffect(() => {
        const calculateCountdown = () => {
            const now = new Date();
            const startOfCurrentDay = new Date(now);
            startOfCurrentDay.setHours(0, 0, 0, 0); // Start of current day at midnight
          
            // Calculate next Monday
            const startOfNextMonday = new Date(startOfCurrentDay);
            startOfNextMonday.setDate(startOfNextMonday.getDate() + (1 + 7 - startOfNextMonday.getDay()) % 7);
          
            const currentTime = now.getTime();
            if (currentTime >= startOfNextMonday.getTime()) {
              // If current time is past or equal to next Monday, reset countdown
              resetAllUserStat();
              setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
              return;
            }
          
            const distance = startOfNextMonday.getTime() - currentTime;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setCountdown({
              days: String(days).padStart(2, '0'),
              hours: String(hours).padStart(2, '0'),
              minutes: String(minutes).padStart(2, '0'),
              seconds: String(seconds).padStart(2, '0'),
            });
          };
        // Calculate countdown on component mount
        calculateCountdown();
        // Update countdown every second
        const intervalRef = setInterval(calculateCountdown, 1000);
        // Clean up interval on component unmount
        return () => clearInterval(intervalRef);
    }, []);

    // console.log(rankList);
    return (
        <View
            style={{
                height: '100%',
                backgroundColor: '#535C91',
                flexDirection: 'column',
            }}>
            <View style={[styles.headerSection, {
                backgroundColor: '#201658',
                margin: '1%',
                borderRadius: 10,
            }]}>
                <Text style={[styles.headerText]}>LEADERBOARD</Text>
            </View>
            <View style={[styles.mainTitle, {
                backgroundColor: '#201658',
                marginHorizontal: '1%',
                borderRadius: 10,
            }]}>
                <Icon name="globe" style={[styles.rankIcon]} />
                <Text style={styles.titleText}>Compete with your friend</Text>
                <View style={[styles.counter]}>
                    <Text style={[styles.textTimer]}>All points will be reset weekly</Text>
                    <Text style={[styles.timer]}>{countdown.days} day {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</Text>
                    <Text style={[styles.textTimer]}>remaining</Text>
                </View>
            </View>
            <View style={{
                height: '52%',
                margin: '1%',
                borderRadius: 10,
                backgroundColor: '#201658',
            }}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={false}>
                    <View style={[styles.listOfRank]}>
                        <View style={styles.listHeading}>
                            <Icon style={styles.placementIndicator} name="mortar-board" />
                            <Text style={styles.nameIndicator}>Competitors</Text>
                            <Text style={styles.pointIndicator} >Points</Text>
                        </View>
                        {rankList.length > 0 ? (rankList.map((member, index) => (
                            <View key={index} style={styles.memberContent}>
                                <Text style={styles.placement}>{index + 1}</Text>
                                <Image source={{ uri: member.image }} resizeMode="contain" style={styles.avatar} />
                                <Text style={styles.memberName}>{member.name}</Text>
                                <Text style={styles.rankValue}>{member.stats}</Text>
                                <Icon name="rocket" style={styles.measurement} />
                            </View>
                        ))) : (<View>
                        </View>)}
                    </View>
                </ScrollView>
            </View>
        </View >
    )
}

export default RankingScreen

const styles = StyleSheet.create({
    headerSection: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'black',
        justifyContent: 'center'
    },
    // back: {
    //     flex: 1,
    //     color: "white",
    //     fontSize: 40,
    //     // backgroundColor:'black',
    //     textAlign: 'center',
    //     textAlignVertical: 'center'
    // },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        // fontStyle:'italic',
        color: '#33B6FF',
        textAlign: 'center',
        textAlignVertical: 'center',
        // backgroundColor:'yellow'
    },
    mainTitle: {
        height: '35%',
        justifyContent: 'space-around',
    },
    rankIcon: {
        // backgroundColor:'black',
        fontSize: 150,
        color: '#98ABEE',
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        color: '#33B6FF',
        fontSize: 25,
        textAlign: 'center'
    },
    counter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTimer: {
        color: 'white',
        fontWeight: '250',
        fontStyle: 'italic',

        fontSize: 23,
    },
    timer: {
        color: 'yellow',
        fontWeight: '400',
        fontStyle: 'italic',
        fontSize: 25,
    },
    listOfRank: {
        height: '100%',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollViewContent: {
        paddingVertical: '1%',
        marginHorizontal: '1%',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    listHeading: {
        flex: 3,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 7,
        padding: '2%',
        marginVertical: '1%',
        justifyContent: 'center',

        width: '99%',
    },
    placementIndicator: {
        flex: 1,
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        textAlignVertical: 'center',
        color: '#33B6FF',
    },
    nameIndicator: {
        flex: 2,
        // backgroundColor:'red',
        textAlignVertical: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#33B6FF',

    },
    pointIndicator: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        color: '#33B6FF',
    },
    memberContent: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 7,
        padding: '2%',
        marginVertical: '1%',
        width: '99%',
    },
    placement: {
        flex: 0.75,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#33B6FF',
        // backgroundColor:'black',
    },
    avatar: {
        flex: 1.25,
        backgroundColor: '#33B6FF',
        width: 70,
        height: 70,
        borderRadius: 100,
        objectFit: 'cover',
        color: '#33B6FF',
        fontSize: 40,
    },
    memberName: {
        flex: 4,
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingLeft: '2%',
        fontSize: 25,
        fontWeight: '400',
        color: '#33B6FF',
        // backgroundColor:'yellow'
    },
    rankValue: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'red',
        // backgroundColor:'blue',
    },
    measurement: {
        flex: 1,
        // backgroundColor:'black',
        color: "red",
        fontSize: 30,
        textAlign: 'center',
        textAlignVertical: 'center'

    },


})