import React from "react";
import { Card, Badge, Popover, Button } from "antd";

import AppContext from "../../context";

const { Meta } = Card;
const CardGrups = ({ circle, name, status, friends, subscribersCount }) => {
	const { isLoading } = React.useContext(AppContext);
	const textColorClass = status === false ? "redText" : "greenText";

	return (
		<Card className="Card" style={{ width: 200 }} loading={isLoading}>
			{circle ? (
				<div className="circle" style={{ background: circle }}></div>
			) : (
				<div className="noImg">
					<img
						src="https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
						alt="notImg"
					/>
				</div>
			)}
			<Meta
				title={name}
				className={textColorClass}
				description={status === false ? "closed" : "open"}
			/>
			{friends && (
				<Badge className="BadgeFrends" count={friends.length} offset={[15, 2.5]}>
					<Popover
						trigger="click"
						content={friends.map((friend, i) => (
							<div key={i}>
								<p>{`${friend.first_name} ${friend.last_name}`}</p>
							</div>
						))}>
						<Button type="primary">friends</Button>
					</Popover>
				</Badge>
			)}
			<br />
			{subscribersCount >= 1 && (
				<Badge
					className="BadgeFrends"
					count={subscribersCount}
					overflowCount={999}
					offset={[20, 7]}>
					subscribers
				</Badge>
			)}
		</Card>
	);
};

export default CardGrups;
