import React, { useState } from "react";
import { Item, DropWrapper, Col } from "../../components";
import { data, statuses } from "../../data";

const Homepage = () => {
  const [items, setItems] = useState(data);

  const onDrop = (item, monitor, status) => {
    
    const mapping = statuses.find((si) => si.status === status);

    setItems((prevState) => {    
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status, icon: mapping.icon });
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      
      newItems.splice(hoverIndex, 0, item);
      // console.log("drag",dragIndex);
      // console.log("item",hoverIndex);
      // console.log("ada",newItems);
      return [...newItems];
    });
  };

  return (
    <div className={"row"}>
      {statuses.map((s) => {
        return (
          <div key={s.status} className={"col-wrapper"}>
            <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
            <DropWrapper onDrop={onDrop} status={s.status}>
              <Col>
                {items
                  .filter((i) => {                    
                    return i.status === s.status;
                  })
                  .map((k, idx) => {
                    
                    return (
                      <Item
                        key={k.id}
                        item={k}
                        index={idx}
                        moveItem={moveItem}
                        status={s}
                      />
                    );
                  })}
              </Col>
            </DropWrapper>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
