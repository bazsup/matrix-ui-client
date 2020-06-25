import matrixSDK from "matrix-js-sdk";
import Vue from 'vue'

export default class Matrix {
  constructor(view) {
    this.view = view
    this.sdk = matrixSDK;
    this.state = new Vue({
      data() {
        return {
          rooms: []
        }
      }
    })
  }

  /**
   *
   * @param {account} Account
   *   user
   *   password
   */
  async login(account) {
    return this.client
      .login("m.login.password", {
        user: account.user,
        password: account.password,
      })
      .then((response) => {
        // console.log('token: ', response.access_token)
        this.view.me = response
      });
  }

  resetData() {
    this.view.rooms = []
    this.view.directRooms = []
  }

  logout() {
    this.client.logout()
    this.resetData()    
  }

  getAccessToken() {
    this.client.getAccessToken()
  }

  startClient() {
    this.client.startClient()
  }

  getAccountData() {
    const dmEvent = this.client.getAccountData('m.direct')
    const aDirectRooms = dmEvent ? Object.values(dmEvent.getContent()) : []
    let directRooms = []
    for (const array of aDirectRooms) {
      directRooms = [...directRooms, ...array]
    }
    this.view.directRooms = directRooms
  }

  initClient(options) {
    this.client = this.sdk.createClient(options);
    
    this.client.on("sync", (state) => {
      // console.log('sync', state)
      switch (state) {
        case "PREPARED":
          this.onPrepared();
          break;
        default:
          break;
      }
    });
  }

  listenTimeline(callback) {
    this.client.on('Room.timeline', callback)
  }

  sendMessage({ roomId, body }) {
    const content = {
      body: body,
      "msgtype": "m.text"
    }
    this.client.sendEvent(roomId, "m.room.message", content, "", () => {
      // console.log(err, res)
    });
  }

  onPrepared() {
    // notifications
    // this.client.on(
    //   "Room.timeline",
    //   (event, room, toStartOfTimeline, removed, data) => {
        // console.log('53!', {
        //   event,
        //   room,
        //   toStartOfTimeline,
        //   removed,
        //   data
        // })
        // if (
        //   !toStartOfTimeline &&
        //   data.liveEvent &&
        //   event.getSender() !== this.client.getUserId()
        // ) {
        //   if (this.options.enableNotifications) {
        //     if (event.event.type === "m.room.message") {
        //       let title = room.name;
        //       let avatar = null;
        //       if (event.sender) {
        //         title = `${event.sender.name}(${title})`;
        //         avatar = event.sender.getAvatarUrl(
        //           this.client.getHomeserverUrl()
        //         );
        //       }
        //       console.log("title: ", title);
        //       console.log("content: ", event.getContent().body.slice(0, 100));
        //       console.log("avatar: ", avatar);
        //       // Push.create(title, {
        //       //   body: event.getContent().body.slice(0, 100),
        //       //   icon: avatar
        //       // });
        //     } else {
        //       this.event.$emit("live-message", event);
        //     }
        //   }
        // }
    //   }
    // );

    this.updateRooms()
    this.getAccountData()
    // this.connectRoomEvents();
  }

  updateRooms() {
    let rooms = this.client.getRooms();

    // sorting
    // like in react-sdk: https://github.com/matrix-org/matrix-react-sdk/blob/master/src/RoomListSorter.js
    const tsOfNewestEvent = function tsOfNewestEvent(room) {
      if (room.timeline.length) {
        return room.timeline[room.timeline.length - 1].getTs();
      }
      return Number.MAX_SAFE_INTEGER;
    };

    rooms.sort((a, b) => tsOfNewestEvent(b) - tsOfNewestEvent(a));

    // return rooms
    // console.log(rooms, typeof rooms)
    // console.log(this.state)
    this.view.rooms = rooms
    // this.state.rooms = rooms;
  }

  getRoomTimeline(roomId) {
    return this.client.getRoom(roomId).timeline
  }
}
