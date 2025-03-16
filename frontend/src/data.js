
import Thumbnail1 from './assets/flag1.jpg'
import Thumbnail2 from './assets/flag2.jpg'
import Thumbnail3 from './assets/flag3.png'
import Candidate1 from './assets/candidate1.jpg'
import Candidate2 from './assets/candidate2.jpg'
import Candidate3 from './assets/candidate3.jpg'
import Candidate4 from './assets/candidate4.jpg'
import Candidate5 from './assets/candidate5.jpg'
import Candidate6 from './assets/candidate6.jpg'
import Candidate7 from './assets/candidate7.jpg'

export const elections = [
    {
        id: "e1",
        title: "Hurvard Presidential election 2025",
        description: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, eligendi voluptatibus dolorum libero quia at quaerat aliquid dignissimos quidem harum praesentium asperiores doloremque. Quia impedit, nobis commodi omnis rem ipsa nihil corrupti odio eum repellat.",
        startdate: new Date(2025, 11, 12),  // December 12, 2025 (Months are 0-based)
        enddate: new Date(2025, 11, 13),
        thumbnail: Thumbnail1,
        condidates: ["c1", "c2", "c3", "c4"],
        voters: []
    },
    {
        id: "e2",
        title: "Legon SRC Presidential Elections 2025",
        description: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, eligendi voluptatibus dolorum libero quia at quaerat aliquid dignissimos quidem harum praesentium asperiores doloremque. Quia impedit, nobis commodi omnis rem ipsa nihil corrupti odio eum repellat.",
        startdate: new Date(2025, 11, 12),  // December 12, 2025 (Months are 0-based)
        enddate: new Date(2025, 11, 13),
        thumbnail: Thumbnail2,
        condidates: ["c5", "c6", "c7"],
        voters: []
    },
    {
        id: "e3",
        title: "Stanford Presidential Elections 2025",
        description: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, eligendi voluptatibus dolorum libero quia at quaerat aliquid dignissimos quidem harum praesentium asperiores doloremque. Quia impedit, nobis commodi omnis rem ipsa nihil corrupti odio eum repellat.",
        startdate: new Date(2025, 11, 12),  // December 12, 2025 (Months are 0-based)
        enddate: new Date(2025, 11, 13),
        thumbnail: Thumbnail3,
        condidates: [],
        voters: []
    }
]

export const candidates = [
    {
        id: "c1",
        fullName: "Purva Panwar",
        image: Candidate1,
        motto: 'Sed quibusdam recusandae allias error harum maxime adipisci amet laborum',
        voteCount: 23,
        election: "e1",
    },
    {
        id: "c2",
        fullName: "Prachi Panwar",
        image: Candidate2,
        motto: 'Sed quibusdam recusandae allias error harum maxime adipisci amet laborum',
        voteCount: 34,
        election: "e1",
    },
    {
        id: "c3",
        fullName: "Kana Panwar",
        image: Candidate3,
        motto: 'Sed quibusdam recusandae allias error harum maxime adipisci amet laborum',
        voteCount: 263,
        election: "e2",
    },
    {
        id: "c4",
        fullName: "Raja Rajput",
        image: Candidate4,
        motto: 'Sed quibusdam recusandae allias error harum maxime adipisci amet laborum',
        voteCount: 5,
        election: "e1",
    },
    {
        id: "c5",
        fullName: "Yash Rajput",
        image: Candidate5,
        motto: 'Sed quibusdam recusandae allias error harum maxime adipisci amet laborum',
        voteCount: 67,
        election: "e2",
    },
    {
        id: "c6",
        fullName: "Abhi Rajput",
        image: Candidate6,
        motto: 'Sed quibusdam recusandae allias error harum maxime adipisci amet laborum',
        voteCount: 44,
        election: "e2",
    },
    {
        id: "c7",
        fullName: "Hashina Raj",
        image: Candidate7,
        motto: 'Sed quibusdam recusandae allias error harum maxime adipisci amet laborum',
        voteCount: 89,
        election: "e2",
    },
]

export const voters = [
    {
        id: "v1",
        fullName: "Ernest Achilef",
        email: "ernest@gmail.com",
        password: "ernest123",
        age: 33,
        idnumber: 123443211234,
        isAdmin: false,
        votedElections: ["e2"]
    },
    {
        id: "v2",
        fullName: "Doris Laryt",
        email: "doris@gmail.com",
        password: "doris123",
        isAdmin: false,
        age: 33,
        idnumber: 123443211235,
        votedElections: ["e1", "e2"]
    },
    {
        id: "v3",
        fullName: "Denial Vinyo",
        email: "denial@gmail.com",
        password: "denial123",
        age: 33,
        idnumber: 123443211236,
        isAdmin: false,
        votedElections: ["e1", "e2"]
    },
    {
        id: "v4",
        fullName: "Diana Ayi",
        email: "diana@gmail.com",
        password: "diana123",
        age: 33,
        idnumber: 1234432112347,
        isAdmin: true,
        votedElections: []
    }
]

