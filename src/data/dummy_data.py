from src.core.models import UserMap, Node
from uuid import uuid4

# Let's create a few sample users with different "shapes" to simulate a real user base.

# User 1: Technical Focus
user_1_id = uuid4()
user_1 = UserMap(
    user_id=user_1_id,
    nodes=[
        Node(node_type="skill", title="Python"),
        Node(node_type="skill", title="API Design"),
        Node(node_type="skill", title="Database Management"),
        Node(node_type="curiosity", title="Machine Learning"),
        Node(node_type="goal", title="Build a web app", completed=True),
        Node(node_type="project", title="Personal Blog Engine"),
    ]
)

# User 2: Artistic Focus
user_2_id = uuid4()
user_2 = UserMap(
    user_id=user_2_id,
    nodes=[
        Node(node_type="skill", title="Drawing"),
        Node(node_type="skill", title="Oil Painting"),
        Node(node_type="curiosity", title="Art History"),
        Node(node_type="value", title="Creative Expression"),
        Node(node_type="goal", title="Create a portfolio", completed=True),
        Node(node_type="project", title="Gallery Exhibition"),
    ]
)

# User 3: A bridge between tech and art
user_3_id = uuid4()
user_3 = UserMap(
    user_id=user_3_id,
    nodes=[
        Node(node_type="skill", title="UI/UX Design"),
        Node(node_type="skill", title="Creative Coding"),
        Node(node_type="skill", title="Python"),
        Node(node_type="curiosity", title="Generative Art"),
        Node(node_type="goal", title="Build an interactive art piece", completed=True),
        Node(node_type="project", title="WebGL Music Visualizer"),
    ]
)

# User 4: A user who is just starting out, similar to User 1
user_4_id = uuid4()
user_4 = UserMap(
    user_id=user_4_id,
    nodes=[
        Node(node_type="skill", title="Python"),
        Node(node_type="curiosity", title="Web Development"),
    ]
)


# A list of "first steps" taken by users for common goals.
# This will simulate the data needed for "Path Markers".
first_steps_db = {
    "Build a web app": {
        "steps": ["Learn Flask", "Choose a CSS framework", "Deploy a hello world app"],
        "counts": [152, 88, 210]
    },
    "Create a portfolio": {
        "steps": ["Choose a platform (e.g., Behance)", "Select 10 best pieces", "Get professional photos of work"],
        "counts": [305, 198, 75]
    }
}


ALL_USERS = [user_1, user_2, user_3, user_4]
