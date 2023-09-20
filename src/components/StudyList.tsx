import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { useEffect, useState } from "react";
import { StudyListType } from "../types/types";
import { SingleStudyListResource } from "./SingleStudyListResource";

interface StudyListProps {
    signedInUser: string;
}

export function StudyList({ signedInUser }: StudyListProps): JSX.Element {
    const [userStudyList, setUserStudyList] = useState<StudyListType[]>();
    const [updateStudyList, setUpdateStudyList] = useState<StudyListType>();

    async function fetchAndStoreUserStudyList() {
        console.log(signedInUser);
        const userId = parseInt(signedInUser);
        const response = await axios.get(
            baseUrl + `/users/${userId}/study-list`
        );
        const fetchedUserStudyList: StudyListType[] = response.data;
        setUserStudyList(fetchedUserStudyList);
        console.log(userStudyList);
    }

    useEffect(() => {
        fetchAndStoreUserStudyList();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signedInUser, updateStudyList]);

    return (
        <>
            <h1> Your Study List </h1>{" "}
            {userStudyList === undefined || userStudyList.length === 0 ? (
                <h1>
                    Your Study List is Empty! Save some resources to view them
                    here
                </h1>
            ) : (
                userStudyList.map((studyListResource) => (
                    <SingleStudyListResource
                        key={studyListResource.studyitem_id}
                        studyListResource={studyListResource}
                        setUpdateStudyList={setUpdateStudyList}
                    />
                ))
            )}
        </>
    );
}
