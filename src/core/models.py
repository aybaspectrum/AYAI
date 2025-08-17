from pydantic import BaseModel, Field
from typing import List, Literal, Dict
from uuid import UUID, uuid4

class Node(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    node_type: Literal["skill", "curiosity", "value", "goal", "project"]
    title: str
    completed: bool = False

class UserMap(BaseModel):
    user_id: UUID
    nodes: List[Node] = []

class AnonymizedUserMap(BaseModel):
    anonymous_user_id: str # This will be a hash
    nodes: List[Node] = []
    shape_vector: List[float] = []

class PathMarkerSuggestion(BaseModel):
    step_text: str
    count: int

class Constellation(BaseModel):
    anonymous_user_id: str
    nodes: List[Node]
