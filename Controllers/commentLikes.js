/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import Model from '../Models/Model';

// voting on article {upvoting or downvoting}
// resourceId is id of article
const voteComment = (req, res, next) => {
	const { _id, resourceId, vote } = req.body;
	Model.CommentModel.find({ _id, resourceId })
		// newVote and prevVote for checking if we need to add remove vote and then add new vote or just need to remove vote
		.then(comment => {
			let newType = '';
			let prevType = '';
			let upvoteCount = 0;
			let downvoteCount = 0;
			console.log(comment[0].votes.length);
			if (comment[0].votes.length > 0) {
				comment[0].votes.map((el, index) => {
					// here we are checking if user has voted before then first we will delete previous vote first
					if (el.userId == vote.userId) {
						console.log('inside removing check');
						comment[0].votes.splice(index, 1);
						newType = vote.type;
						prevType = el.type;
					}
				});
			}

			if (newType !== '' && newType === prevType) {
				comment[0].userVoteStatus.downvote = false;
				comment[0].userVoteStatus.upvote = false;
			} else {
				comment[0].votes.push(vote);
				if (vote.type === 'upvote') {
					comment[0].userVoteStatus.upvote = true;
					comment[0].userVoteStatus.downvote = false;
				} else {
					comment[0].userVoteStatus.downvote = true;
					comment[0].userVoteStatus.upvote = false;
				}
			}
			// here we are just getting the upvote and downvote count
			if (comment[0].votes.length > 0) {
				comment[0].votes.map(el => {
					if (el.type === 'upvote') {
						upvoteCount += 1;
					}
					if (el.type === 'downvote') {
						downvoteCount += 1;
					}
				});
			}
			// sending different responses on the base of vote removed or vpte changed
			comment[0]
				.save()
				.then(doc => {
					if (newType === prevType && newType !== '') {
						res.status(200).send({
							Message: 'vote removed Successfully',
							userVoteStatus: doc.userVoteStatus,
							upvoteCount,
							downvoteCount,
						});
					} else {
						res.status(200).send({
							Message: 'voted  Successfully.',
							vote: doc.votes[doc.votes.length - 1],
							userVoteStatus: doc.userVoteStatus,
							upvoteCount,
							downvoteCount,
						});
					}
				})
				// eslint-disable-next-line no-unused-vars
				.catch(err => {
					res.status(500);
					next(new Error('Unable to vote. Please Try later.'));
				});
		})
		.catch(() => {
			res.status(500).send({ Message: 'Can not vote right now' });
		});
};

export default voteComment;
