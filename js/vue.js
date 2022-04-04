
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js"
import * as fs from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
import * as Meta from 'https://unpkg.com/vue-meta@2.4.0/dist/vue-meta.min.js'
import globalInit from "./global.js"

const firebaseConfig = {
    apiKey: "AIzaSyC6MteJqGc1N3eIugRCNWH5j_wdDe_0xk8",
    authDomain: "hazel-phoenix-343515.firebaseapp.com",
    projectId: "hazel-phoenix-343515",
    storageBucket: "hazel-phoenix-343515.appspot.com",
    messagingSenderId: "953452850968",
    appId: "1:953452850968:web:f0b073e42a30e8d522386d",
    measurementId: "G-QT2S65D4VV"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const firestore = fs.getFirestore(firebaseApp)

const _api = axios.create()
const _moment = moment().locale('id')

new Vue({
    el: '#invitation',
    metaInfo: function () {
        return {
            title: this.eventTitle,
            titleTemplate: '%s | Lovee.id',
            meta: [
                { property: 'og:url', content: window.location.origin },
                { property: 'og:title', content: this.eventTitle },
                { property: 'og:description', content: this.eventTitle + ' Wedding. Online Wedding Invitation, created with heart by Lovee.id' },
                { property: 'og:image', content: this.changeImgURL(this.client.banner[0], 200, 200) },
                { property: 'og:image:alt', content: this.eventTitle },
            ]
        }
    },
    data: function () {
        return {
            guestName: null,
            isOpenInvitation: false,
            isAudioPlay: false,
            audioComp: null,
            client: clientData,
            countdown: [],
            guestResume: {
                total: 0,
                akan: 0,
                tidak: 0,
                ragu: 0,
            },
            confirmationList: [
                { name: 'Hadir', val: 'akan_hadir', class: 'bg-success-theme' },
                { name: 'Tidak Hadir', val: 'tidak_hadir', class: 'bg-danger-theme' },
                { name: 'Masih Ragu', val: 'ragu_hadir', class: 'bg-gray-theme' },
            ],
            guestBook: [],
            guestBookForm: {
                guestName: '',
                alias: '',
                comment: '',
                confirmation: 'akan_hadir',
                amount: 'Rp. 0',
                phone: '+62 ',
                gift: '',
                trxID: '',
                trxStats: false
            },
            maskInput: {
                amount: '',
                phone: '',
            },
            loveeLogo: 'https://drive.google.com/file/d/1RFtFh92iedY1YC__2o6qO26ZPj2Ar6d-/view?usp=sharing',
            endpoint: {
                payChannel: '/v1/guest/event/payment-chanel/'
            },
            dataList: {}
        }
    },
    computed: {
        isMobile: function () {
            var check = false;
            // (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera)
            // return check
            (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera)
            return check
        },
        eventTitle: function () {
            return this.client.owner[0].nickname + ' ' + this.client.owner[1].nickname + ' Wedding'
        }
    },
    watch: {
        isOpenInvitation: {
            immediate: false,
            deep: false,
            handler (val) {
                if (val) {
                    this.isAudioPlay = true
                    this.$nextTick(e => {
                        globalInit(val)
                    })
                }
            }
        },
        isAudioPlay: {
            immediate: false,
            deep: false,
            handler (val) {
                if (val) this.audioComp.play()
                else this.audioComp.pause()
            }
        }
    },
    filters: {
        longDate: function (value) {
            if (!value) return ''
            value = moment(value).format('dddd, LL')
            return value
        },
        dayOnly: function (value) {
            if (!value) return ''
            value = moment(value).format('dddd')
            return value
        },
        dateOnly: function (value) {
            if (!value) return ''
            value = moment(value).format('LL')
            return value
        },
        timeOnly: function (value) {
            if (!value) return ''
            value = moment(value).format('LT')
            return value
        }
    },
    created () {
        globalInit()
        this.audioComp = new Audio(this.changeAudioURL(this.client.sound))
    },
    beforeMount () {
        this.getGuestName()
        this.$set(this.guestBookForm, 'guestName', this.guestName)
    },
    mounted () {
        for (let i = 0; i < this.client.event.length; i++) {
            const event = this.client.event[i]
            setInterval(function () {
                this.countdown = this.countEndTime(event.startDateTime)
            }.bind(this), 1000)
        }
        this.getComment()
    },
    methods: {
        getGuestName: function (e) {
            var urlParams = window.location.search.slice(1)
            if (urlParams) {
                urlParams = urlParams.split('#')[0].split('=')[1].split('-').join(' ')
                this.guestName = urlParams
            }
        },
        getComment: async function () {
            // const q = fs.query(fs.collection(firestore, window.location.hostname), fs.orderBy("sendtime", "desc"))
            const a = fs.query(fs.collection(firestore, window.location.hostname), fs.orderBy("sendtime", "desc"))
            const unsubscribe = fs.onSnapshot(a, (querySnapshot) => {
                const data = []
                const unique = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data())
                })
                // confirmation
                const uniqueData = this.countUnique(data.map(x => x.guestName.trim()))
                uniqueData.forEach(el => {
                    var evUser = data.filter(x => x.guestName.trim() === el)
                    unique.push({ guestName: evUser[0].guestName, confirmation: evUser[0].confirmation })
                })
                let resume = {
                    total: uniqueData.size,
                    akan: unique.filter(x => x.confirmation === 'akan_hadir').length,
                    tidak: unique.filter(x => x.confirmation === 'tidak_hadir').length,
                    ragu: unique.filter(x => x.confirmation === 'ragu_hadir').length,
                }
                this.guestResume = Object.assign({}, resume)
                this.guestBook = data
            })
        },
        addComment: async function () {
            const formdata = this.guestBookForm
            formdata.alias = this.getAlias(formdata.guestName)
            formdata.sendtime = new fs.serverTimestamp()
            await fs.addDoc(fs.collection(firestore, window.location.hostname), formdata)
            this.$set(this.guestBookForm, 'comment', '')
        },
        countUnique: function (iterable) {
            return new Set(iterable)
        },
        getAlias: function (e) {
            if (e.split(' ').length > 1) return e.split(' ')[0].charAt(0).toUpperCase() + e.split(' ')[1].charAt(0).toUpperCase()
            else {
                if (e.length > 1) return e.charAt(0).toUpperCase() + e.charAt(1).toUpperCase()
                else return e.charAt(0).toUpperCase()
            }
        },
        changeImgURL: function (e, w = '500', h = '500') {
            const urls = e.match(/[-\w]{25,}/)
            const baseURL = 'https://drive.google.com/thumbnail?'
            const res = baseURL + 'id=' + urls + '&sz=w' + w + '-h' + h
            return res
        },
        changeAudioURL: function (e) {
            const urls = e.match(/[-\w]{25,}/)
            const baseURL = 'https://docs.google.com/uc?export=download&'
            const res = baseURL + 'id=' + urls
            return res
        },
        generateCalendarLink:function(){
            var title = this.eventTitle.replace(/ /g, "+");
            var desc = this.client.event[0].title+'+'+title+ '%0ALokasi+Acara+%3A%0A'+this.client.event[0].location+'%0A'+this.client.event[0].address
            var dates = ''
            return 'https://www.google.com/calendar/render?action=TEMPLATE&text='+title+'&details='+desc+'&location='+this.client.event[0].address+'&dates=20220508T013000Z%2F20220508T170000Z'
        },
        getAPI: function (methods, endpoint, params) {
            return _api[methods](endpoint, params).then(res => {
                return res
            }).catch(err => {
                console.log(err)
                return { data: null }
            })
        },
        countEndTime: function (e) {
            // const total = Date.parse(e) - Date.parse(new Date())
            const total = moment(e).valueOf() - moment(new Date().valueOf())
            const seconds = Math.floor((total / 1000) % 60)
            const minutes = Math.floor((total / 1000 / 60) % 60)
            const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
            const days = Math.floor(total / (1000 * 60 * 60 * 24))
            const result = [
                { name: 'Hari', res: days },
                { name: 'Jam', res: hours },
                { name: 'Menit', res: minutes },
                { name: 'Detik', res: seconds },
            ]
            return result
        },
        chooseConfirmation: function (e) {
            this.$set(this.guestBookForm, 'confirmation', e)
        },
        onlyNumber (e, prop, prefix, defVal = '', tranform = true) {
            let val = e.target.value.split(' ')
            if (val.length == 1) this.$set(this.guestBookForm, prop, prefix + ' ' + defVal)
            else {
                const result = tranform ? Number(val[1].replace(/[^\d]/g, '')).toLocaleString('id-ID') : Number(val[1].replace(/[^\d]/g, ''))
                this.$set(this.guestBookForm, prop, prefix + ' ' + result)
            }
        },
    }
})